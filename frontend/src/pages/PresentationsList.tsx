import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { EmptyState } from '../components/EmptyState';
import type { Presentation } from '../types';
import '../styles/presentations-list.css';

export function PresentationsList() {
  const navigate = useNavigate();
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPresentations = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiClient.fetchPresentations();
      setPresentations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load presentations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPresentations();
  }, []);

  const handleCardClick = (id: string) => {
    navigate(`/view/${id}`);
  };

  const handleCardKeyPress = (event: React.KeyboardEvent, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigate(`/view/${id}`);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading presentations..." />;
  }

  if (error) {
    return <ErrorMessage message={error} retry={loadPresentations} />;
  }

  if (presentations.length === 0) {
    return (
      <EmptyState
        title="No Presentations Found"
        message="Create your first presentation in the frontend/src/presentations/ directory"
        icon={
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2"/>
            <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2" strokeLinecap="round"/>
            <line x1="12" y1="17" x2="12" y2="21" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        }
      />
    );
  }

  return (
    <div className="presentations-container">
      <div className="presentations-header">
        <h1>Presentations</h1>
        <p className="presentations-count">{presentations.length} presentation{presentations.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="presentations-grid">
        {presentations.map((presentation) => (
          <div
            key={presentation.id}
            className="presentation-card"
            onClick={() => handleCardClick(presentation.id)}
            onKeyPress={(e) => handleCardKeyPress(e, presentation.id)}
            role="button"
            tabIndex={0}
            aria-label={`Open ${presentation.title}`}
          >
            <div className="card-preview">
              <div className="card-preview-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2"/>
                  <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="12" y1="17" x2="12" y2="21" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="card-aspect-ratio">16:9</div>
            </div>

            <div className="card-content">
              <h2 className="card-title">{presentation.title}</h2>
              {presentation.description && (
                <p className="card-description">{presentation.description}</p>
              )}
              <div className="card-meta">
                <span className="card-slides">{presentation.slideCount} slides</span>
                <span className="card-date">
                  {new Date(presentation.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
