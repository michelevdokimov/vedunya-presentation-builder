import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import '../styles/viewer.css';

export function PresentationViewer() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const printMode = searchParams.get('print') === 'true';

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [PresentationComponent, setPresentationComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const loadPresentation = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!id) {
          throw new Error('Presentation ID is required');
        }

        // Lazy load presentation component
        // This improves initial page load time
        const LazyPresentation = lazy(() =>
          import(`../presentations/${id}.tsx`)
            .catch(() => {
              throw new Error(`Presentation "${id}" not found`);
            })
        );

        setPresentationComponent(() => LazyPresentation);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load presentation');
      } finally {
        setLoading(false);
      }
    };

    loadPresentation();
  }, [id]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      // F key toggles fullscreen
      if (event.key === 'f' || event.key === 'F') {
        event.preventDefault();
        toggleFullscreen();
      }

      // Escape exits fullscreen
      if (event.key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [toggleFullscreen]);

  if (loading) {
    return <LoadingSpinner message="Loading presentation..." />;
  }

  if (error || !PresentationComponent) {
    return <ErrorMessage message={error || 'Failed to load presentation'} />;
  }

  return (
    <>
      {/* Spectacle Deck uses position: fixed, so render directly */}
      <Suspense fallback={<LoadingSpinner message="Loading slides..." />}>
        <PresentationComponent />
      </Suspense>

      {/* Overlay controls on top of Spectacle */}
      {!printMode && (
        <div className="viewer-controls">
          <button
            className="control-btn fullscreen-btn"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit fullscreen (F)' : 'Enter fullscreen (F)'}
            title={isFullscreen ? 'Exit fullscreen (F)' : 'Enter fullscreen (F)'}
          >
            {isFullscreen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>

          <button
            className="control-btn close-btn"
            onClick={() => navigate('/')}
            aria-label="Закрыть презентацию"
            title="Закрыть"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}

    </>
  );
}
