"""
Pydantic models for API request/response schemas.
"""
from datetime import datetime
from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


class Presentation(BaseModel):
    """Presentation metadata model."""

    id: str = Field(..., description="Unique presentation identifier (filename without extension)")
    title: str = Field(..., description="Presentation title")
    description: Optional[str] = Field(None, description="Optional presentation description")
    slide_count: int = Field(..., ge=1, description="Number of slides in presentation", serialization_alias="slideCount")
    created_at: str = Field(..., description="Creation date (ISO format)", serialization_alias="createdAt")
    updated_at: str = Field(..., description="Last update date (ISO format)", serialization_alias="updatedAt")
    file_path: str = Field(..., description="Relative file path", serialization_alias="filePath")

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "id": "welcome",
                "title": "Welcome to Vedunya",
                "description": "Example presentation demonstrating Spectacle components",
                "slideCount": 4,
                "createdAt": "2025-12-10T00:00:00Z",
                "updatedAt": "2025-12-10T00:00:00Z",
                "filePath": "presentations/welcome.tsx"
            }
        }


class PresentationList(BaseModel):
    """List of presentations response."""

    presentations: list[Presentation] = Field(default_factory=list, description="List of available presentations")
    total: int = Field(..., ge=0, description="Total number of presentations")

    class Config:
        json_schema_extra = {
            "example": {
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
        }


class ExportJobStatus(str, Enum):
    """Export job status enum."""

    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class ExportRequest(BaseModel):
    """Request model for PDF export."""

    format: str = Field(default="pdf", description="Export format (currently only 'pdf')")
    quality: str = Field(default="high", description="Export quality: 'standard' or 'high'")

    class Config:
        json_schema_extra = {
            "example": {
                "format": "pdf",
                "quality": "high"
            }
        }


class ExportJob(BaseModel):
    """Export job model."""

    job_id: str = Field(..., description="Unique job identifier", serialization_alias="jobId")
    presentation_id: str = Field(..., description="Presentation being exported", serialization_alias="presentationId")
    status: ExportJobStatus = Field(..., description="Current job status")
    progress: Optional[int] = Field(None, ge=0, le=100, description="Export progress percentage")
    download_url: Optional[str] = Field(None, description="URL to download completed PDF", serialization_alias="downloadUrl")
    error: Optional[str] = Field(None, description="Error message if job failed")
    created_at: datetime = Field(default_factory=datetime.utcnow, description="Job creation timestamp", serialization_alias="createdAt")
    completed_at: Optional[datetime] = Field(None, description="Job completion timestamp", serialization_alias="completedAt")

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "jobId": "export_123456789",
                "presentationId": "welcome",
                "status": "completed",
                "progress": 100,
                "downloadUrl": "/api/exports/export_123456789/download",
                "error": None,
                "createdAt": "2025-12-10T12:00:00Z",
                "completedAt": "2025-12-10T12:00:30Z"
            }
        }


class ExportStatusResponse(BaseModel):
    """Response model for export status check."""

    job: ExportJob = Field(..., description="Export job details")

    class Config:
        json_schema_extra = {
            "example": {
                "job": {
                    "job_id": "export_123456789",
                    "presentation_id": "welcome",
                    "status": "processing",
                    "progress": 50,
                    "created_at": "2025-12-10T12:00:00Z"
                }
            }
        }


class HealthResponse(BaseModel):
    """Health check response."""

    status: str = Field(..., description="Service status")
    service: Optional[str] = Field(None, description="Service name")

    class Config:
        json_schema_extra = {
            "example": {
                "status": "healthy",
                "service": "Vedunya Presentation Builder API"
            }
        }
