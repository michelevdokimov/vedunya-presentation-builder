"""
Presentations API Routes

Endpoints for listing and retrieving presentation metadata.
"""
from pathlib import Path
from fastapi import APIRouter, HTTPException, status

from models.schemas import Presentation, PresentationList
from services.presentation_scanner import PresentationScanner

router = APIRouter(prefix="/api/presentations", tags=["presentations"])

# Initialize scanner with presentations directory
# This path will be set dynamically in main.py
_scanner: PresentationScanner | None = None


def set_scanner(scanner: PresentationScanner) -> None:
    """Set the presentation scanner instance."""
    global _scanner
    _scanner = scanner


def get_scanner() -> PresentationScanner:
    """Get the presentation scanner instance."""
    if _scanner is None:
        raise RuntimeError("Presentation scanner not initialized")
    return _scanner


@router.get("", response_model=PresentationList, summary="List all presentations")
async def list_presentations() -> PresentationList:
    """
    Get list of all available presentations.

    Returns:
        PresentationList: Object containing list of presentations and total count

    Example response:
        ```json
        {
            "presentations": [
                {
                    "id": "welcome",
                    "title": "Welcome to Vedunya",
                    "description": "Example presentation",
                    "slide_count": 4,
                    "created_at": "2025-12-10T00:00:00Z",
                    "updated_at": "2025-12-10T00:00:00Z",
                    "file_path": "presentations/welcome.tsx"
                }
            ],
            "total": 1
        }
        ```
    """
    scanner = get_scanner()
    presentations = await scanner.scan_all()

    return PresentationList(
        presentations=presentations,
        total=len(presentations)
    )


@router.get("/{presentation_id}", response_model=Presentation, summary="Get presentation by ID")
async def get_presentation(presentation_id: str) -> Presentation:
    """
    Get metadata for a specific presentation.

    Args:
        presentation_id: Unique presentation identifier (filename without extension)

    Returns:
        Presentation: Presentation metadata object

    Raises:
        HTTPException: 404 if presentation not found

    Example response:
        ```json
        {
            "id": "welcome",
            "title": "Welcome to Vedunya",
            "description": "Example presentation demonstrating Spectacle components",
            "slide_count": 4,
            "created_at": "2025-12-10T00:00:00Z",
            "updated_at": "2025-12-10T00:00:00Z",
            "file_path": "presentations/welcome.tsx"
        }
        ```
    """
    scanner = get_scanner()
    presentation = await scanner.get_by_id(presentation_id)

    if presentation is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Presentation '{presentation_id}' not found"
        )

    return presentation
