# Vedunya Presentation Builder - Backend

FastAPI backend для просмотра и экспорта React/Spectacle презентаций в формате 16:9.

## Требования

- Python 3.11+
- Playwright (автоматически устанавливается)

## Установка

1. Создайте виртуальное окружение:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# или
venv\Scripts\activate  # Windows
```

2. Установите зависимости:
```bash
pip install -r requirements.txt
```

3. Установите браузеры Playwright:
```bash
playwright install chromium
```

## Запуск

### Режим разработки
```bash
python main.py
```

Сервер запустится на `http://localhost:8000`

### Продакшн режим
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## API Документация

После запуска сервера доступна интерактивная документация:

- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc
- **OpenAPI Schema**: http://localhost:8000/api/openapi.json

## API Endpoints

### Презентации

**GET /api/presentations**
- Получить список всех презентаций
- Response: `PresentationList`

**GET /api/presentations/{id}**
- Получить метаданные конкретной презентации
- Response: `Presentation`

### Экспорт

**POST /api/exports/{presentation_id}/export**
- Запустить экспорт презентации в PDF
- Request Body: `ExportRequest` (optional)
- Response: `ExportJob`

**GET /api/exports/{job_id}/status**
- Проверить статус экспорта
- Response: `ExportStatusResponse`

**GET /api/exports/{job_id}/download**
- Скачать готовый PDF
- Response: PDF file

## Структура проекта

```
backend/
├── main.py                    # Точка входа FastAPI приложения
├── requirements.txt           # Зависимости Python
├── models/
│   ├── __init__.py
│   └── schemas.py             # Pydantic модели для API
├── services/
│   ├── __init__.py
│   ├── presentation_scanner.py # Сканирование презентаций
│   └── export_service.py       # Экспорт в PDF через Playwright
├── routes/
│   ├── __init__.py
│   ├── presentations.py        # Эндпоинты презентаций
│   └── exports.py              # Эндпоинты экспорта
└── exports/                    # Директория для PDF файлов
```

## Переменные окружения

- `FRONTEND_URL` - URL фронтенда (default: `http://localhost:5173`)

## Разработка

### Type hints
Все функции должны иметь type hints:
```python
async def get_presentation(presentation_id: str) -> Presentation:
    ...
```

### Async/await
Используйте async/await для всех I/O операций:
```python
async def scan_all(self) -> list[Presentation]:
    presentations = []
    for file_path in self.presentations_dir.glob("*.tsx"):
        presentation = await self._parse_presentation_file(file_path)
        presentations.append(presentation)
    return presentations
```

### Error handling
Используйте HTTPException для ошибок API:
```python
from fastapi import HTTPException, status

if presentation is None:
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Presentation '{presentation_id}' not found"
    )
```

## Playwright Export

Экспорт использует Playwright для рендеринга презентаций:

- **Viewport**: 1920x1080 (16:9)
- **Device Scale Factor**: 2 (высокое качество)
- **Browser**: Chromium headless
- **Wait Strategy**: `networkidle` + дополнительная задержка для анимаций

## Производительность

- Браузер переиспользуется между экспортами
- Задания выполняются асинхронно в фоне
- Старые PDF автоматически очищаются (можно настроить)

## Troubleshooting

### Playwright не установлен
```bash
playwright install chromium
```

### Порт 8000 занят
```bash
uvicorn main:app --port 8001
```

### Frontend недоступен
Проверьте, что frontend запущен на `http://localhost:5173` или установите `FRONTEND_URL`

### Низкое качество PDF
Увеличьте `device_scale_factor` в `export_service.py`
