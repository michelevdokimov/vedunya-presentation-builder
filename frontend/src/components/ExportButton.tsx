import { useState } from 'react';
import { apiClient } from '../api/client';
import type { ExportButtonProps } from '../types';
import '../styles/export.css';

export function ExportButton({ presentationId, onExportComplete }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    setExporting(true);
    setProgress(0);
    setError(null);

    try {
      // Start export
      const job = await apiClient.exportToPdf(presentationId);
      setProgress(25);

      // Poll for status
      const pollInterval = setInterval(async () => {
        try {
          const status = await apiClient.checkExportStatus(job.jobId);

          if (status.progress !== undefined) {
            setProgress(status.progress);
          }

          if (status.status === 'completed') {
            clearInterval(pollInterval);
            setProgress(100);

            // Download PDF
            setTimeout(() => {
              apiClient.downloadPdf(job.jobId);
              setExporting(false);
              setProgress(0);

              if (onExportComplete && status.downloadUrl) {
                onExportComplete(status.downloadUrl);
              }
            }, 500);
          } else if (status.status === 'failed') {
            clearInterval(pollInterval);
            setError(status.error || 'Export failed');
            setExporting(false);
            setProgress(0);
          }
        } catch (err) {
          clearInterval(pollInterval);
          setError(err instanceof Error ? err.message : 'Export failed');
          setExporting(false);
          setProgress(0);
        }
      }, 1000);

      // Timeout after 2 minutes
      setTimeout(() => {
        clearInterval(pollInterval);
        if (exporting) {
          setError('Export timeout');
          setExporting(false);
          setProgress(0);
        }
      }, 120000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start export');
      setExporting(false);
      setProgress(0);
    }
  };

  return (
    <div className="export-button-container">
      <button
        className="control-btn export-btn"
        onClick={handleExport}
        disabled={exporting}
        aria-label="Export to PDF"
        title="Export to PDF"
      >
        {exporting ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="export-spinner">
            <circle cx="12" cy="12" r="10" strokeWidth="2" opacity="0.25"/>
            <path d="M12 2a10 10 0 0 1 10 10" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="7 10 12 15 17 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="12" y1="15" x2="12" y2="3" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </button>

      {exporting && (
        <div className="export-progress">
          <div className="export-progress-bar">
            <div
              className="export-progress-fill"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <span className="export-progress-text">{Math.round(progress)}%</span>
        </div>
      )}

      {error && (
        <div className="export-error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
