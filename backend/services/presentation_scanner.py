"""
Presentation Scanner Service

Scans the presentations directory and extracts metadata from presentation files.
"""
import os
import re
from pathlib import Path
from typing import Optional
from datetime import datetime

from models.schemas import Presentation


class PresentationScanner:
    """Scans presentation files and extracts metadata."""

    def __init__(self, presentations_dir: str):
        """
        Initialize scanner with presentations directory path.

        Args:
            presentations_dir: Absolute path to presentations directory
        """
        self.presentations_dir = Path(presentations_dir)
        if not self.presentations_dir.exists():
            raise ValueError(f"Presentations directory not found: {presentations_dir}")

    async def scan_all(self) -> list[Presentation]:
        """
        Scan all presentation files and extract metadata.

        Returns:
            List of Presentation objects with metadata
        """
        presentations = []

        # Find all .tsx, .jsx, .ts, .js files
        for extension in ["*.tsx", "*.jsx", "*.ts", "*.js"]:
            for file_path in self.presentations_dir.glob(extension):
                try:
                    presentation = await self._parse_presentation_file(file_path)
                    if presentation:
                        presentations.append(presentation)
                except Exception as e:
                    print(f"Error parsing {file_path}: {e}")
                    continue

        return presentations

    async def get_by_id(self, presentation_id: str) -> Optional[Presentation]:
        """
        Get presentation metadata by ID.

        Args:
            presentation_id: Presentation identifier (filename without extension)

        Returns:
            Presentation object or None if not found
        """
        # Try all supported extensions
        for extension in [".tsx", ".jsx", ".ts", ".js"]:
            file_path = self.presentations_dir / f"{presentation_id}{extension}"
            if file_path.exists():
                return await self._parse_presentation_file(file_path)

        return None

    async def _parse_presentation_file(self, file_path: Path) -> Optional[Presentation]:
        """
        Parse presentation file and extract metadata.

        Args:
            file_path: Path to presentation file

        Returns:
            Presentation object or None if parsing fails
        """
        try:
            content = file_path.read_text(encoding="utf-8")

            # Extract metadata object using regex
            metadata = self._extract_metadata(content)

            if not metadata:
                return None

            # Extract slide count
            slide_count = self._count_slides(content)

            # Get file stats
            stat = file_path.stat()
            created_at = datetime.fromtimestamp(stat.st_ctime).isoformat()
            updated_at = datetime.fromtimestamp(stat.st_mtime).isoformat()

            # Use metadata from file or fallback to defaults
            presentation_id = metadata.get("id", file_path.stem)
            title = metadata.get("title", file_path.stem.replace("-", " ").replace("_", " ").title())
            description = metadata.get("description")

            # Override timestamps if provided in metadata
            if "createdAt" in metadata:
                created_at = metadata["createdAt"]
            if "updatedAt" in metadata:
                updated_at = metadata["updatedAt"]

            return Presentation(
                id=presentation_id,
                title=title,
                description=description,
                slide_count=slide_count,
                created_at=created_at,
                updated_at=updated_at,
                file_path=f"presentations/{file_path.name}"
            )

        except Exception as e:
            print(f"Error parsing presentation {file_path}: {e}")
            return None

    def _extract_metadata(self, content: str) -> dict:
        """
        Extract metadata object from file content.

        Args:
            content: File content as string

        Returns:
            Dictionary with metadata or empty dict if not found
        """
        # Pattern to match: export const metadata = { ... }
        pattern = r'export\s+const\s+metadata\s*=\s*\{([^}]+)\}'
        match = re.search(pattern, content, re.DOTALL)

        if not match:
            return {}

        metadata_str = match.group(1)
        metadata = {}

        # Extract key-value pairs
        # Match: key: 'value' or key: "value"
        for line in metadata_str.split('\n'):
            line = line.strip()
            if ':' not in line:
                continue

            key_value = line.split(':', 1)
            if len(key_value) != 2:
                continue

            key = key_value[0].strip()
            value = key_value[1].strip().rstrip(',')

            # Remove quotes
            value = value.strip('"\'')

            metadata[key] = value

        return metadata

    def _count_slides(self, content: str) -> int:
        """
        Count number of Slide components in content.

        Args:
            content: File content as string

        Returns:
            Number of slides found
        """
        # Count <Slide> or <Slide ... > occurrences
        pattern = r'<Slide[\s>]'
        matches = re.findall(pattern, content)
        return len(matches)

    def get_file_path(self, presentation_id: str) -> Optional[Path]:
        """
        Get absolute file path for presentation.

        Args:
            presentation_id: Presentation identifier

        Returns:
            Path object or None if not found
        """
        for extension in [".tsx", ".jsx", ".ts", ".js"]:
            file_path = self.presentations_dir / f"{presentation_id}{extension}"
            if file_path.exists():
                return file_path

        return None
