import { useState, useEffect } from 'react';
import { exportToPdf } from '../utils/pdfExport';
import type { ExportButtonProps } from '../types';
import '../styles/export.css';

export function ExportButton({ presentationId, onExportComplete }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [slideCount, setSlideCount] = useState<number>(1);

  // Load presentation metadata to get slide count
  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const module = await import(`../presentations/${presentationId}.tsx`);
        if (module.metadata?.slideCount) {
          setSlideCount(module.metadata.slideCount);
        }
      } catch (err) {
        console.warn('Could not load presentation metadata:', err);
      }
    };

    if (presentationId) {
      loadMetadata();
    }
  }, [presentationId]);

  const handleExport = async () => {
    setExporting(true);
    setProgress(0);
    setError(null);

    try {
      console.log(`Starting export of ${slideCount} slides for: ${presentationId}`);

      // Export all slides
      await exportToPdf([document.body], {
        title: presentationId,
        totalSlides: slideCount,
        scale: 2,
        onProgress: setProgress,
      });

      if (onExportComplete) {
        onExportComplete('client-side-export');
      }

    } catch (err) {
      console.error('Export error:', err);
      setError(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setExporting(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  return (
    <div className="export-button-container">
      <button
        className="control-btn export-btn"
        onClick={handleExport}
        disabled={exporting}
        aria-label="Export to PDF"
        title={`Export to PDF (${slideCount} slides)`}
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
