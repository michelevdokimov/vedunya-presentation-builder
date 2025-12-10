// API Data Models

export interface Presentation {
  id: string;
  title: string;
  description?: string;
  slideCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PresentationMetadata {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type ExportStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface ExportJob {
  jobId: string;
  presentationId: string;
  status: ExportStatus;
  progress?: number;
  downloadUrl?: string;
  error?: string;
}

export interface ApiError {
  detail: string;
  status?: number;
}

// Component Props
export interface PresentationCardProps {
  presentation: Presentation;
}

export interface ViewerProps {
  presentationId: string;
  printMode?: boolean;
}

export interface ExportButtonProps {
  presentationId: string;
  onExportComplete?: (downloadUrl: string) => void;
}
