import { ReactNode } from 'react';
import '../styles/slide-preview.css';

interface SlidePreviewProps {
  children: ReactNode;
}

/**
 * SlidePreview component wraps slide content for use as a presentation card preview
 * Scales down the slide to fit within the card preview area while maintaining aspect ratio
 */
export function SlidePreview({ children }: SlidePreviewProps) {
  return (
    <div className="slide-preview-wrapper">
      <div className="slide-preview-scaler">
        {children}
      </div>
    </div>
  );
}
