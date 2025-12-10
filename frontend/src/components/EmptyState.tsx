import '../styles/empty.css';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, message, icon }: EmptyStateProps) {
  return (
    <div className="empty-state">
      {icon && <div className="empty-icon">{icon}</div>}
      <h2 className="empty-title">{title}</h2>
      <p className="empty-message">{message}</p>
    </div>
  );
}
