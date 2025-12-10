# Agent Instructions - Vedunya Presentation Builder

## Quick Reference

**Project**: Vedunya Presentation Builder
**Path**: `/Users/mike/Vedunya Presentation Builder`
**Stack**: FastAPI (Python) + React/Spectacle (TypeScript) + Playwright

---

## Agent Coordination Protocol

### Before Starting Any Task

1. Read `claudedocs/PROJECT_CONTEXT.md` for decisions
2. Read `claudedocs/TASK_LIST.md` for current progress
3. Check existing code structure
4. Verify no conflicting changes in progress

### Task Handoff Format

```yaml
completed:
  - task: "Description of completed work"
    files: ["path/to/modified/files"]
    tests: "passed|pending|none"

pending:
  - task: "Next task description"
    blocker: "Optional blocker description"

context:
  key_decisions: ["Any new decisions made"]
  open_questions: ["Questions for user/next agent"]
```

---

## Domain-Specific Instructions

### Backend Agent (Python/FastAPI)

**Scope**: `backend/` directory

**Key Files**:
- `main.py` - FastAPI app initialization
- `services/export_service.py` - Playwright PDF logic
- `routes/` - API endpoints

**Standards**:
- Type hints required (Python 3.11+)
- Async/await for I/O operations
- Pydantic models for request/response
- Error handling with HTTPException

**Export Service Requirements**:
- Use Playwright async API
- Viewport: 1920x1080
- Wait for slide animations to complete
- Handle export queue (prevent parallel exports overload)

```python
# Example pattern
from playwright.async_api import async_playwright

async def export_to_pdf(presentation_id: str) -> str:
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1920, 'height': 1080})
        # ... export logic
```

### Frontend Agent (React/TypeScript)

**Scope**: `frontend/` directory

**Key Files**:
- `src/presentations/` - User presentations
- `src/components/` - Reusable components
- `src/viewer/` - Viewer logic
- `src/pages/` - Route pages

**Standards**:
- TypeScript strict mode
- Functional components with hooks
- Spectacle components for slides
- CSS modules or styled-components

**Viewer Requirements**:
- Support `?print=true` query for export mode
- Fullscreen toggle (F key or button)
- Keyboard navigation (arrows, space, escape)
- Progress indicator (slide N of M)

```tsx
// Example pattern
import { Deck, Slide, Heading } from 'spectacle';

export default function MyPresentation() {
  return (
    <Deck>
      <Slide><Heading>Title</Heading></Slide>
    </Deck>
  );
}
```

### Documentation Agent

**Scope**: `docs/` directory

**Required Documents**:
1. `PRESENTATION_FORMAT.md` - 16:9 spec, file structure, metadata
2. `COMPONENTS.md` - All available Spectacle components
3. `STYLES.md` - Themes, colors, fonts, CSS variables
4. `ANIMATIONS.md` - Transitions, appear effects, timing

**Format**: Markdown with:
- Code examples for every feature
- Visual examples where applicable
- Best practices section
- Common mistakes to avoid

---

## Common Patterns

### Adding New Presentation Component

```tsx
// frontend/src/components/CustomSlide.tsx
import { Slide, Box } from 'spectacle';

interface CustomSlideProps {
  title: string;
  children: React.ReactNode;
}

export const CustomSlide: React.FC<CustomSlideProps> = ({ title, children }) => {
  return (
    <Slide>
      <Box>{title}</Box>
      {children}
    </Slide>
  );
};
```

### Adding New API Endpoint

```python
# backend/routes/new_route.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class ResponseModel(BaseModel):
    data: str

@router.get("/endpoint", response_model=ResponseModel)
async def get_endpoint():
    return ResponseModel(data="value")
```

### Registering Route in Main

```python
# backend/main.py
from fastapi import FastAPI
from routes.presentations import router as presentations_router

app = FastAPI()
app.include_router(presentations_router, prefix="/api")
```

---

## 16:9 Format Specifications

### Dimensions
- **Width**: 1920px
- **Height**: 1080px
- **Aspect Ratio**: 16:9 (1.777...)

### Safe Areas
- **Full bleed**: 1920 x 1080
- **Safe area**: 1800 x 960 (60px margins)
- **Title safe**: 1728 x 864 (96px margins)

### Typography Scale
- **H1**: 72px (titles)
- **H2**: 48px (subtitles)
- **H3**: 36px (section headers)
- **Body**: 24px (regular text)
- **Caption**: 18px (small text)

### PDF Export Settings
```python
await page.pdf(
    path=output_path,
    width='1920px',
    height='1080px',
    print_background=True,
    margin={'top': '0', 'right': '0', 'bottom': '0', 'left': '0'}
)
```

---

## Testing Requirements

### Backend Tests
```bash
cd backend
pytest tests/ -v
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Manual Testing Checklist
- [ ] Presentation list loads
- [ ] Single presentation displays correctly
- [ ] Slides navigate with keyboard
- [ ] Fullscreen works
- [ ] PDF export completes
- [ ] Downloaded PDF has correct dimensions

---

## Troubleshooting

### Playwright Export Fails
1. Check Chromium installed: `playwright install chromium`
2. Verify frontend running at expected URL
3. Check viewport size matches 1920x1080
4. Increase timeout for complex presentations

### Presentation Not Loading
1. Check file exports both `metadata` and default component
2. Verify Spectacle imports are correct
3. Check browser console for errors
4. Ensure presentation ID matches filename

### PDF Quality Issues
1. Use `deviceScaleFactor: 2` in Playwright for higher resolution
2. Wait for fonts to load before capture
3. Check image resolution in source (min 2x for retina)
4. Verify print styles are applied

### CORS Errors
1. Check FastAPI CORS middleware configuration
2. Verify allowed origins include frontend URL
3. Check preflight request handling
