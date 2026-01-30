"""
Vedunya Presentation Builder - FastAPI Backend

Main application entry point.
"""
import os
from pathlib import Path
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.schemas import HealthResponse
from services.presentation_scanner import PresentationScanner
from services.export_service import ExportService
from routes.presentations import router as presentations_router, set_scanner
from routes.exports import router as exports_router, set_export_service


# Configuration
BASE_DIR = Path(__file__).resolve().parent
EXPORTS_DIR = BASE_DIR / "exports"
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

# Presentations directory - configurable for Docker deployment
# Default: ../frontend/src/presentations (for local dev)
PRESENTATIONS_DIR = Path(os.getenv(
    "PRESENTATIONS_DIR",
    str(BASE_DIR.parent / "frontend" / "src" / "presentations")
))


# Lifespan context manager for startup/shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager."""
    # Startup
    print("Starting Vedunya Presentation Builder API...")

    # Initialize services
    scanner = PresentationScanner(str(PRESENTATIONS_DIR))
    export_service = ExportService(
        frontend_url=FRONTEND_URL,
        exports_dir=str(EXPORTS_DIR)
    )

    # Set service instances in routers
    set_scanner(scanner)
    set_export_service(export_service)

    print(f"Presentations directory: {PRESENTATIONS_DIR}")
    print(f"Exports directory: {EXPORTS_DIR}")
    print(f"Frontend URL: {FRONTEND_URL}")

    yield

    # Shutdown
    print("Shutting down...")
    await export_service.close()


# Create FastAPI application
app = FastAPI(
    title="Vedunya Presentation Builder API",
    version="1.0.0",
    description="API for viewing and exporting React/Spectacle presentations in 16:9 format",
    lifespan=lifespan,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# CORS configuration for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # Alternative frontend port
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(presentations_router)
app.include_router(exports_router)


# Root endpoints
@app.get("/", response_model=HealthResponse, summary="Root health check")
async def root() -> HealthResponse:
    """Root endpoint health check."""
    return HealthResponse(
        status="ok",
        service="Vedunya Presentation Builder"
    )


@app.get("/api/health", response_model=HealthResponse, summary="API health check")
async def health_check() -> HealthResponse:
    """API health check endpoint."""
    return HealthResponse(
        status="healthy",
        service="Vedunya Presentation Builder API"
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
