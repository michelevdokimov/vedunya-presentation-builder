/**
 * Client-side PDF export using jsPDF + html2canvas
 * Generates PDFs directly in the browser without server-side Playwright
 */
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export interface ExportOptions {
  /** Presentation title for filename */
  title: string;
  /** Total number of slides in presentation */
  totalSlides: number;
  /** Quality scale (1-3, higher = better quality but larger file) */
  scale?: number;
  /** Callback for progress updates (0-100) */
  onProgress?: (progress: number) => void;
}

/**
 * Simulate keyboard event to navigate slides
 */
function navigateSlide(direction: 'next' | 'prev' | 'first'): void {
  let key: string;
  let code: string;

  switch (direction) {
    case 'next':
      key = 'ArrowRight';
      code = 'ArrowRight';
      break;
    case 'prev':
      key = 'ArrowLeft';
      code = 'ArrowLeft';
      break;
    case 'first':
      key = 'Home';
      code = 'Home';
      break;
  }

  const event = new KeyboardEvent('keydown', {
    key,
    code,
    keyCode: key === 'ArrowRight' ? 39 : key === 'ArrowLeft' ? 37 : 36,
    bubbles: true,
    cancelable: true,
  });

  document.dispatchEvent(event);
}

/**
 * Wait for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Capture current viewport as canvas
 */
async function captureViewport(scale: number): Promise<HTMLCanvasElement> {
  // Try to find the Spectacle deck container for more accurate capture
  const deckContainer = document.querySelector('[class*="spectacle-deck"]') as HTMLElement
    || document.querySelector('.spectacle-fullscreen-button')?.parentElement as HTMLElement
    || document.body;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const canvas = await html2canvas(deckContainer, {
    scale: scale,
    useCORS: true,
    allowTaint: true,
    logging: false,
    width: window.innerWidth,
    height: window.innerHeight,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    x: 0,
    y: 0,
    scrollX: 0,
    scrollY: 0,
    foreignObjectRendering: false,
    backgroundColor: null, // Preserve original background
  } as any);

  return canvas;
}

/**
 * Export all slides in presentation to PDF
 */
export async function exportToPdf(
  _slideElements: HTMLElement[] | string,
  options: ExportOptions
): Promise<void> {
  const { title, totalSlides, scale = 2, onProgress } = options;

  if (totalSlides <= 0) {
    throw new Error('No slides to export');
  }

  onProgress?.(5);

  // Create PDF with 16:9 landscape orientation (1920x1080)
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [1080, 1920],
    hotfixes: ['px_scaling'],
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  // Go to first slide
  navigateSlide('first');
  await sleep(500);

  onProgress?.(10);

  // Capture each slide
  for (let i = 0; i < totalSlides; i++) {
    console.log(`Capturing slide ${i + 1} of ${totalSlides}`);

    // Wait for slide transition to complete
    await sleep(300);

    // Capture current slide
    const canvas = await captureViewport(scale);

    if (canvas.width === 0 || canvas.height === 0) {
      console.warn(`Slide ${i + 1}: Empty canvas, skipping`);
      navigateSlide('next');
      continue;
    }

    // Convert to JPEG
    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    // Add new page for slides after the first
    if (i > 0) {
      pdf.addPage([1080, 1920], 'landscape');
    }

    // Calculate dimensions to FILL the page (cover style - may crop edges)
    // This ensures no empty space on the PDF page
    const canvasRatio = canvas.width / canvas.height;
    const pdfRatio = pdfWidth / pdfHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    // Use "cover" style: fill entire page, may crop some content
    if (canvasRatio > pdfRatio) {
      // Canvas is wider - fit to height, crop width, center horizontally
      drawHeight = pdfHeight;
      drawWidth = pdfHeight * canvasRatio;
      offsetX = (pdfWidth - drawWidth) / 2;
      offsetY = 0;
    } else {
      // Canvas is taller - fit to width, crop height, center vertically
      drawWidth = pdfWidth;
      drawHeight = pdfWidth / canvasRatio;
      offsetX = 0;
      offsetY = (pdfHeight - drawHeight) / 2;
    }

    // Add image to PDF (centered and scaled to cover/fill)
    pdf.addImage(imgData, 'JPEG', offsetX, offsetY, drawWidth, drawHeight);

    // Update progress (10-90%)
    const progress = 10 + Math.round(((i + 1) / totalSlides) * 80);
    onProgress?.(progress);

    // Navigate to next slide (except for last slide)
    if (i < totalSlides - 1) {
      navigateSlide('next');
    }
  }

  onProgress?.(95);

  // Save PDF
  const filename = `${title.replace(/[^a-zA-Z0-9-_]/g, '_')}.pdf`;
  pdf.save(filename);

  // Return to first slide
  navigateSlide('first');

  onProgress?.(100);
}

/**
 * Simple browser print dialog as fallback
 */
export function printPresentation(): void {
  window.print();
}
