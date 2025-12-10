"""
Export Service

Handles PDF export of presentations using Playwright for browser automation.
"""
import asyncio
import uuid
from pathlib import Path
from datetime import datetime, timezone
from typing import Optional

from playwright.async_api import async_playwright

from models.schemas import ExportJob, ExportJobStatus


class ExportService:
    """Manages PDF export operations using Playwright."""

    def __init__(self, frontend_url: str, exports_dir: str):
        """
        Initialize export service.

        Args:
            frontend_url: Base URL of frontend application (e.g., http://localhost:5173)
            exports_dir: Directory to store exported PDF files
        """
        self.frontend_url = frontend_url.rstrip("/")
        self.exports_dir = Path(exports_dir)
        self.exports_dir.mkdir(parents=True, exist_ok=True)

        # In-memory job storage (for production, use Redis or database)
        self.jobs: dict[str, ExportJob] = {}

    async def create_export_job(self, presentation_id: str) -> ExportJob:
        """
        Create a new export job.

        Args:
            presentation_id: ID of presentation to export

        Returns:
            ExportJob object with job details
        """
        job_id = f"export_{uuid.uuid4().hex[:12]}"

        job = ExportJob(
            job_id=job_id,
            presentation_id=presentation_id,
            status=ExportJobStatus.PENDING,
            progress=0,
            created_at=datetime.now(timezone.utc)
        )

        self.jobs[job_id] = job

        # Start export in background
        asyncio.create_task(self._process_export(job_id))

        return job

    async def get_job_status(self, job_id: str) -> Optional[ExportJob]:
        """
        Get current status of export job.

        Args:
            job_id: Export job identifier

        Returns:
            ExportJob object or None if not found
        """
        return self.jobs.get(job_id)

    def get_pdf_path(self, job_id: str) -> Optional[Path]:
        """
        Get file path for exported PDF.

        Args:
            job_id: Export job identifier

        Returns:
            Path to PDF file or None if not found
        """
        pdf_path = self.exports_dir / f"{job_id}.pdf"
        return pdf_path if pdf_path.exists() else None

    async def _process_export(self, job_id: str) -> None:
        """
        Process export job (internal method).

        Args:
            job_id: Export job identifier
        """
        job = self.jobs.get(job_id)
        if not job:
            return

        try:
            # Update status to processing
            job.status = ExportJobStatus.PROCESSING
            job.progress = 10

            # Use fresh playwright instance for each export to avoid stale browser issues
            async with async_playwright() as p:
                # Launch with robust options for macOS compatibility
                browser = await p.chromium.launch(
                    headless=True,
                    # Additional args for macOS stability
                    args=[
                        '--disable-blink-features=AutomationControlled',
                        '--disable-dev-shm-usage',  # Avoid shared memory issues
                        '--no-sandbox',  # Required for some macOS configurations
                        '--disable-setuid-sandbox',
                        '--disable-gpu',  # Avoid GPU acceleration issues
                    ]
                )

                # Create browser context and page
                context = await browser.new_context(
                    viewport={"width": 1920, "height": 1080},
                    device_scale_factor=2,  # High DPI for better quality
                )

                page = await context.new_page()

                # Navigate to presentation viewer
                url = f"{self.frontend_url}/view/{job.presentation_id}?print=true"
                await page.goto(url, wait_until="networkidle")

                job.progress = 30

                # Wait for Spectacle presentation to load
                # Spectacle uses .spectacle-v7-slide class for slides
                await page.wait_for_selector(".spectacle-v7-slide", timeout=10000)
                await asyncio.sleep(1)  # Additional wait for animations

                job.progress = 50

                # Generate PDF
                pdf_path = self.exports_dir / f"{job_id}.pdf"

                await page.pdf(
                    path=str(pdf_path),
                    width="1920px",
                    height="1080px",
                    print_background=True,
                    margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
                    prefer_css_page_size=False,
                )

                job.progress = 90

                # Cleanup
                await context.close()
                await browser.close()

            # Update job status
            job.status = ExportJobStatus.COMPLETED
            job.progress = 100
            job.download_url = f"/api/exports/{job_id}/download"
            job.completed_at = datetime.now(timezone.utc)

        except Exception as e:
            # Update job with error
            job.status = ExportJobStatus.FAILED

            # Provide detailed error message for common issues
            error_msg = str(e)
            if "Target page, context or browser has been closed" in error_msg:
                error_msg = (
                    "Browser crashed during export. This may indicate Playwright/Chromium "
                    "compatibility issues with your system. Try updating Playwright: "
                    "`playwright install --force chromium`"
                )
            elif "Executable doesn't exist" in error_msg:
                error_msg = (
                    "Chromium browser not found. Run: `playwright install chromium`"
                )

            job.error = error_msg
            job.completed_at = datetime.now(timezone.utc)
            print(f"Export job {job_id} failed: {e}")
            import traceback
            traceback.print_exc()

    async def cleanup_old_jobs(self, max_age_hours: int = 24) -> int:
        """
        Remove old completed/failed jobs and their files.

        Args:
            max_age_hours: Maximum age of jobs to keep (default 24 hours)

        Returns:
            Number of jobs cleaned up
        """
        cleaned = 0
        cutoff_time = datetime.now(timezone.utc).timestamp() - (max_age_hours * 3600)

        job_ids_to_remove = []

        for job_id, job in self.jobs.items():
            if job.completed_at is None:
                continue

            job_age = job.completed_at.timestamp()
            if job_age < cutoff_time:
                # Remove PDF file if exists
                pdf_path = self.exports_dir / f"{job_id}.pdf"
                if pdf_path.exists():
                    pdf_path.unlink()

                job_ids_to_remove.append(job_id)
                cleaned += 1

        # Remove jobs from memory
        for job_id in job_ids_to_remove:
            del self.jobs[job_id]

        return cleaned

    async def close(self) -> None:
        """Cleanup resources (no-op, browser is created per-export)."""
        pass
