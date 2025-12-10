# API Usage Examples

Примеры использования Vedunya Presentation Builder API.

## Base URL

```
http://localhost:8000
```

---

## Health Checks

### Root Health Check
```bash
curl http://localhost:8000/
```

**Response:**
```json
{
  "status": "ok",
  "service": "Vedunya Presentation Builder"
}
```

### API Health Check
```bash
curl http://localhost:8000/api/health
```

**Response:**
```json
{
  "status": "healthy",
  "service": "Vedunya Presentation Builder API"
}
```

---

## Presentations Endpoints

### List All Presentations

**Request:**
```bash
curl http://localhost:8000/api/presentations
```

**Response:**
```json
{
  "presentations": [
    {
      "id": "welcome",
      "title": "Welcome to Vedunya",
      "description": "Example presentation demonstrating Spectacle components in 16:9 format",
      "slide_count": 4,
      "created_at": "2025-12-10",
      "updated_at": "2025-12-10",
      "file_path": "presentations/welcome.tsx"
    }
  ],
  "total": 1
}
```

### Get Single Presentation

**Request:**
```bash
curl http://localhost:8000/api/presentations/welcome
```

**Response:**
```json
{
  "id": "welcome",
  "title": "Welcome to Vedunya",
  "description": "Example presentation demonstrating Spectacle components in 16:9 format",
  "slide_count": 4,
  "created_at": "2025-12-10",
  "updated_at": "2025-12-10",
  "file_path": "presentations/welcome.tsx"
}
```

**Error (404):**
```bash
curl http://localhost:8000/api/presentations/nonexistent
```

```json
{
  "detail": "Presentation 'nonexistent' not found"
}
```

---

## Export Endpoints

### Create Export Job

**Request:**
```bash
curl -X POST http://localhost:8000/api/exports/welcome/export \
  -H "Content-Type: application/json" \
  -d '{"format": "pdf", "quality": "high"}'
```

**Response:**
```json
{
  "job_id": "export_a1b2c3d4e5f6",
  "presentation_id": "welcome",
  "status": "pending",
  "progress": 0,
  "download_url": null,
  "error": null,
  "created_at": "2025-12-10T12:00:00.000Z",
  "completed_at": null
}
```

### Check Export Status

**Request:**
```bash
curl http://localhost:8000/api/exports/export_a1b2c3d4e5f6/status
```

**Response (Processing):**
```json
{
  "job": {
    "job_id": "export_a1b2c3d4e5f6",
    "presentation_id": "welcome",
    "status": "processing",
    "progress": 50,
    "download_url": null,
    "error": null,
    "created_at": "2025-12-10T12:00:00.000Z",
    "completed_at": null
  }
}
```

**Response (Completed):**
```json
{
  "job": {
    "job_id": "export_a1b2c3d4e5f6",
    "presentation_id": "welcome",
    "status": "completed",
    "progress": 100,
    "download_url": "/api/exports/export_a1b2c3d4e5f6/download",
    "error": null,
    "created_at": "2025-12-10T12:00:00.000Z",
    "completed_at": "2025-12-10T12:00:30.000Z"
  }
}
```

**Response (Failed):**
```json
{
  "job": {
    "job_id": "export_a1b2c3d4e5f6",
    "presentation_id": "welcome",
    "status": "failed",
    "progress": 0,
    "download_url": null,
    "error": "Failed to render presentation: timeout",
    "created_at": "2025-12-10T12:00:00.000Z",
    "completed_at": "2025-12-10T12:00:15.000Z"
  }
}
```

### Download PDF

**Request:**
```bash
curl -O -J http://localhost:8000/api/exports/export_a1b2c3d4e5f6/download
```

**Response:**
- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename="welcome.pdf"`
- Binary PDF data

**Error (Job Not Completed):**
```json
{
  "detail": "Export job is processing, not ready for download"
}
```

---

## Complete Export Workflow

### 1. List presentations
```bash
curl http://localhost:8000/api/presentations
```

### 2. Create export job
```bash
JOB=$(curl -s -X POST http://localhost:8000/api/exports/welcome/export | jq -r '.job_id')
echo "Job ID: $JOB"
```

### 3. Poll status until completed
```bash
while true; do
  STATUS=$(curl -s http://localhost:8000/api/exports/$JOB/status | jq -r '.job.status')
  echo "Status: $STATUS"

  if [ "$STATUS" = "completed" ]; then
    break
  elif [ "$STATUS" = "failed" ]; then
    echo "Export failed!"
    exit 1
  fi

  sleep 2
done
```

### 4. Download PDF
```bash
curl -O -J http://localhost:8000/api/exports/$JOB/download
```

---

## JavaScript/TypeScript Examples

### Fetch API

```javascript
// List presentations
const listPresentations = async () => {
  const response = await fetch('http://localhost:8000/api/presentations');
  const data = await response.json();
  return data.presentations;
};

// Get single presentation
const getPresentation = async (id) => {
  const response = await fetch(`http://localhost:8000/api/presentations/${id}`);
  if (!response.ok) {
    throw new Error(`Presentation not found: ${id}`);
  }
  return response.json();
};

// Create export
const createExport = async (presentationId) => {
  const response = await fetch(
    `http://localhost:8000/api/exports/${presentationId}/export`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ format: 'pdf', quality: 'high' })
    }
  );
  return response.json();
};

// Check status
const checkExportStatus = async (jobId) => {
  const response = await fetch(
    `http://localhost:8000/api/exports/${jobId}/status`
  );
  const data = await response.json();
  return data.job;
};

// Download PDF
const downloadPDF = async (jobId, presentationId) => {
  const response = await fetch(
    `http://localhost:8000/api/exports/${jobId}/download`
  );
  const blob = await response.blob();

  // Trigger download
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${presentationId}.pdf`;
  a.click();
  window.URL.revokeObjectURL(url);
};

// Complete workflow
const exportPresentation = async (presentationId) => {
  // 1. Create job
  const job = await createExport(presentationId);
  console.log('Export started:', job.job_id);

  // 2. Poll status
  const pollInterval = setInterval(async () => {
    const status = await checkExportStatus(job.job_id);
    console.log('Progress:', status.progress);

    if (status.status === 'completed') {
      clearInterval(pollInterval);

      // 3. Download
      await downloadPDF(job.job_id, presentationId);
      console.log('Download complete!');
    } else if (status.status === 'failed') {
      clearInterval(pollInterval);
      console.error('Export failed:', status.error);
    }
  }, 2000);
};

// Usage
exportPresentation('welcome');
```

### Axios

```javascript
import axios from 'axios';

const API_BASE = 'http://localhost:8000';

// List presentations
const listPresentations = async () => {
  const { data } = await axios.get(`${API_BASE}/api/presentations`);
  return data.presentations;
};

// Get single presentation
const getPresentation = async (id) => {
  try {
    const { data } = await axios.get(`${API_BASE}/api/presentations/${id}`);
    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`Presentation not found: ${id}`);
    }
    throw error;
  }
};

// Create export with progress tracking
const createExport = async (presentationId, onProgress) => {
  // Create job
  const { data: job } = await axios.post(
    `${API_BASE}/api/exports/${presentationId}/export`,
    { format: 'pdf', quality: 'high' }
  );

  // Poll status
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE}/api/exports/${job.job_id}/status`
        );

        if (onProgress) {
          onProgress(data.job.progress);
        }

        if (data.job.status === 'completed') {
          clearInterval(interval);
          resolve(data.job);
        } else if (data.job.status === 'failed') {
          clearInterval(interval);
          reject(new Error(data.job.error));
        }
      } catch (error) {
        clearInterval(interval);
        reject(error);
      }
    }, 2000);
  });
};

// Download PDF
const downloadPDF = async (jobId, presentationId) => {
  const response = await axios.get(
    `${API_BASE}/api/exports/${jobId}/download`,
    { responseType: 'blob' }
  );

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${presentationId}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

// Usage
const handleExport = async (presentationId) => {
  try {
    const job = await createExport(presentationId, (progress) => {
      console.log(`Progress: ${progress}%`);
    });

    await downloadPDF(job.job_id, presentationId);
    console.log('Export completed!');
  } catch (error) {
    console.error('Export failed:', error.message);
  }
};

handleExport('welcome');
```

---

## Python Examples

### Using `requests`

```python
import requests
import time

API_BASE = "http://localhost:8000"

# List presentations
def list_presentations():
    response = requests.get(f"{API_BASE}/api/presentations")
    response.raise_for_status()
    return response.json()["presentations"]

# Get single presentation
def get_presentation(presentation_id):
    response = requests.get(f"{API_BASE}/api/presentations/{presentation_id}")
    if response.status_code == 404:
        raise ValueError(f"Presentation not found: {presentation_id}")
    response.raise_for_status()
    return response.json()

# Create export and wait for completion
def export_presentation(presentation_id):
    # Create job
    response = requests.post(
        f"{API_BASE}/api/exports/{presentation_id}/export",
        json={"format": "pdf", "quality": "high"}
    )
    response.raise_for_status()
    job = response.json()
    job_id = job["job_id"]

    print(f"Export started: {job_id}")

    # Poll status
    while True:
        response = requests.get(f"{API_BASE}/api/exports/{job_id}/status")
        response.raise_for_status()
        status = response.json()["job"]

        print(f"Status: {status['status']}, Progress: {status['progress']}%")

        if status["status"] == "completed":
            print("Export completed!")
            return job_id
        elif status["status"] == "failed":
            raise RuntimeError(f"Export failed: {status['error']}")

        time.sleep(2)

# Download PDF
def download_pdf(job_id, output_path):
    response = requests.get(
        f"{API_BASE}/api/exports/{job_id}/download",
        stream=True
    )
    response.raise_for_status()

    with open(output_path, "wb") as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)

    print(f"PDF saved to: {output_path}")

# Usage
if __name__ == "__main__":
    presentations = list_presentations()
    print(f"Found {len(presentations)} presentations")

    # Export first presentation
    if presentations:
        pres = presentations[0]
        job_id = export_presentation(pres["id"])
        download_pdf(job_id, f"{pres['id']}.pdf")
```

---

## Error Handling Best Practices

### HTTP Status Codes

- `200 OK` - Successful request
- `201 Created` - Export job created
- `404 Not Found` - Presentation or job not found
- `400 Bad Request` - Invalid request or job not ready

### Frontend Error Handling

```typescript
const getPresentation = async (id: string) => {
  try {
    const response = await fetch(`/api/presentations/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Presentation not found');
      }
      throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch presentation:', error);
    throw error;
  }
};
```

---

## Rate Limiting (Future)

Currently no rate limiting implemented. For production:

```python
# Example with slowapi
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.post("/api/exports/{id}/export")
@limiter.limit("5/minute")  # Max 5 exports per minute
async def create_export(id: str):
    ...
```
