import '../styles/error.css';

interface ErrorMessageProps {
  title?: string;
  message: string;
  retry?: () => void;
}

export function ErrorMessage({
  title = 'Error',
  message,
  retry
}: ErrorMessageProps) {
  return (
    <div className="error-message">
      <div className="error-icon" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
          <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
          <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <h2 className="error-title">{title}</h2>
      <p className="error-text">{message}</p>
      {retry && (
        <button className="error-retry-btn" onClick={retry}>
          Try Again
        </button>
      )}
    </div>
  );
}
