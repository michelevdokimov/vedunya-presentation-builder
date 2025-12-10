import type { Presentation, ExportJob, ApiError } from '../types';

const API_BASE_URL = '/api';

class ApiClient {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const error: ApiError = await response.json().catch(() => ({
          detail: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
        }));
        throw new Error(error.detail);
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network request failed');
    }
  }

  async fetchPresentations(): Promise<Presentation[]> {
    const response = await this.request<{ presentations: Presentation[]; total: number }>('/presentations');
    return response.presentations;
  }

  async fetchPresentation(id: string): Promise<Presentation> {
    return this.request<Presentation>(`/presentations/${id}`);
  }

  async exportToPdf(presentationId: string): Promise<ExportJob> {
    return this.request<ExportJob>(`/exports/${presentationId}/export`, {
      method: 'POST',
    });
  }

  async checkExportStatus(jobId: string): Promise<ExportJob> {
    return this.request<ExportJob>(`/exports/${jobId}/status`);
  }

  getDownloadUrl(jobId: string): string {
    return `${API_BASE_URL}/exports/${jobId}/download`;
  }

  async downloadPdf(jobId: string): Promise<void> {
    const url = this.getDownloadUrl(jobId);
    window.location.href = url;
  }
}

export const apiClient = new ApiClient();
