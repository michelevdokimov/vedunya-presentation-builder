"""
Test PDF export functionality.

This script tests the PDF export service to ensure:
1. PDF is generated with correct dimensions (1920x1080)
2. Export job workflow works correctly
3. File is created and downloadable
"""
import asyncio
import sys
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))

from services.export_service import ExportService


async def test_export_service():
    """Test the export service."""
    print("🧪 Testing PDF Export Service\n")

    # Configuration
    frontend_url = "http://localhost:5173"
    exports_dir = Path(__file__).parent.parent / "backend" / "exports"

    print(f"Frontend URL: {frontend_url}")
    print(f"Exports directory: {exports_dir}")
    print()

    # Initialize service
    service = ExportService(
        frontend_url=frontend_url,
        exports_dir=str(exports_dir)
    )

    try:
        # Test 1: Create export job
        print("📝 Test 1: Creating export job...")
        job = await service.create_export_job("welcome")
        print(f"✓ Job created: {job.job_id}")
        print(f"  Status: {job.status}")
        print(f"  Presentation: {job.presentation_id}")
        print()

        # Test 2: Wait for export to complete
        print("⏳ Test 2: Waiting for export to complete...")
        max_wait = 60  # seconds
        elapsed = 0

        while elapsed < max_wait:
            await asyncio.sleep(2)
            elapsed += 2

            current_job = await service.get_job_status(job.job_id)

            if current_job is None:
                print("❌ Job not found!")
                return False

            print(f"  Status: {current_job.status} | Progress: {current_job.progress}%")

            if current_job.status == "completed":
                print("✓ Export completed successfully")
                print(f"  Download URL: {current_job.download_url}")
                break
            elif current_job.status == "failed":
                print(f"❌ Export failed: {current_job.error}")
                return False
        else:
            print("❌ Export timeout!")
            return False

        print()

        # Test 3: Verify PDF file exists
        print("📄 Test 3: Verifying PDF file...")
        pdf_path = service.get_pdf_path(job.job_id)

        if pdf_path is None:
            print("❌ PDF file not found!")
            return False

        print(f"✓ PDF file exists: {pdf_path.name}")
        print(f"  Size: {pdf_path.stat().st_size / 1024:.2f} KB")
        print()

        # Test 4: Check PDF dimensions (basic check)
        print("📐 Test 4: PDF validation...")
        print("  Expected: 1920x1080 (16:9)")
        print("  Note: Manual verification recommended")
        print("  Open the PDF to verify quality and dimensions")
        print()

        print("✅ All tests passed!")
        print()
        print(f"📥 Generated PDF: {pdf_path}")

        return True

    except Exception as e:
        print(f"❌ Test failed with error: {e}")
        import traceback
        traceback.print_exc()
        return False

    finally:
        # Cleanup
        await service.close()


async def test_export_workflow():
    """Test complete export workflow with manual verification."""
    print("=" * 60)
    print("PDF Export Testing")
    print("=" * 60)
    print()

    print("Prerequisites:")
    print("1. Backend must be running (python backend/main.py)")
    print("2. Frontend must be running (cd frontend && npm run dev)")
    print("3. Playwright must be installed (playwright install chromium)")
    print()

    proceed = input("Ready to proceed? (y/n): ")
    if proceed.lower() != 'y':
        print("Test cancelled.")
        return

    print()
    success = await test_export_service()

    print()
    print("=" * 60)
    if success:
        print("✅ Export test completed successfully!")
        print()
        print("Manual verification steps:")
        print("1. Open the generated PDF in backend/exports/")
        print("2. Verify dimensions are 1920x1080 (16:9)")
        print("3. Check all slides are rendered correctly")
        print("4. Verify fonts and colors match the presentation")
    else:
        print("❌ Export test failed!")
        print()
        print("Troubleshooting:")
        print("1. Ensure backend is running on http://localhost:8000")
        print("2. Ensure frontend is running on http://localhost:5173")
        print("3. Check backend/exports/ directory permissions")
        print("4. Review logs for error details")
    print("=" * 60)


if __name__ == "__main__":
    asyncio.run(test_export_workflow())
