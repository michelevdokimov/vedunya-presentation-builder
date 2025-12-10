"""
Exports API Routes

Endpoints for creating and managing PDF export jobs.
"""
from fastapi import APIRouter, HTTPException, status
from fastapi.responses import FileResponse

from models.schemas import (
    ExportJob,
    ExportRequest,
    ExportStatusResponse,
)
from services.export_service import ExportService

router = APIRouter(prefix="/api/exports", tags=["exports"])

# Export service instance (set in main.py)
_export_service: ExportService | None = None


def set_export_service(service: ExportService) -> None:
    """Set the export service instance."""
    global _export_service
    _export_service = service


def get_export_service() -> ExportService:
    """Get the export service instance."""
    if _export_service is None:
        raise RuntimeError("Export service not initialized")
    return _export_service


@router.post(
    "/{presentation_id}/export",
    response_model=ExportJob,
    status_code=status.HTTP_201_CREATED,
    summary="Start PDF export"
)
async def create_export(
    presentation_id: str,
    request: ExportRequest = ExportRequest()
) -> ExportJob:
    """
    Create a new PDF export job for a presentation.

    Args:
        presentation_id: ID of presentation to export
        request: Export configuration options

    Returns:
        ExportJob: Created job with status and job_id

    Example response:
        ```json
        {
            "job_id": "export_abc123def456",
            "presentation_id": "welcome",
            "status": "pending",
            "progress": 0,
            "created_at": "2025-12-10T12:00:00Z"
        }
        ```
    """
    service = get_export_service()

    # Validate presentation exists (via scanner)
    # This will be done in frontend for now, backend trusts the request

    job = await service.create_export_job(presentation_id)

    return job


@router.get(
    "/{job_id}/status",
    response_model=ExportStatusResponse,
    summary="Check export status"
)
async def get_export_status(job_id: str) -> ExportStatusResponse:
    """
    Get current status of an export job.

    Args:
        job_id: Export job identifier

    Returns:
        ExportStatusResponse: Current job status and details

    Raises:
        HTTPException: 404 if job not found

    Example response:
        ```json
        {
            "job": {
                "job_id": "export_abc123def456",
                "presentation_id": "welcome",
                "status": "processing",
                "progress": 50,
                "created_at": "2025-12-10T12:00:00Z"
            }
        }
        ```
    """
    service = get_export_service()
    job = await service.get_job_status(job_id)

    if job is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Export job '{job_id}' not found"
        )

    return ExportStatusResponse(job=job)


@router.get(
    "/{job_id}/download",
    response_class=FileResponse,
    summary="Download exported PDF"
)
async def download_export(job_id: str) -> FileResponse:
    """
    Download the exported PDF file.

    Args:
        job_id: Export job identifier

    Returns:
        FileResponse: PDF file download

    Raises:
        HTTPException: 404 if job not found or not completed
        HTTPException: 400 if job failed or still processing
    """
    service = get_export_service()

    # Check job exists
    job = await service.get_job_status(job_id)
    if job is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Export job '{job_id}' not found"
        )

    # Check job completed successfully
    if job.status == "failed":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Export job failed: {job.error}"
        )

    if job.status != "completed":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Export job is {job.status}, not ready for download"
        )

    # Get PDF file path
    pdf_path = service.get_pdf_path(job_id)
    if pdf_path is None or not pdf_path.exists():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="PDF file not found"
        )

    # Return file
    return FileResponse(
        path=str(pdf_path),
        media_type="application/pdf",
        filename=f"{job.presentation_id}.pdf",
        headers={
            "Content-Disposition": f'attachment; filename="{job.presentation_id}.pdf"'
        }
    )
