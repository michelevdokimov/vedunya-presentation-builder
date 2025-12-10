import { Outlet, Link, useLocation } from 'react-router-dom';
import '../styles/layout.css';

export function Layout() {
  const location = useLocation();
  const isViewerPage = location.pathname.startsWith('/view/');

  return (
    <div className="layout">
      {!isViewerPage && (
        <header className="layout-header">
          <div className="container">
            <Link to="/" className="logo">
              <h1>Vedunya Presentation Builder</h1>
            </Link>
            <nav className="nav">
              <Link to="/" className="nav-link">
                Presentations
              </Link>
            </nav>
          </div>
        </header>
      )}

      <main className={`layout-main ${isViewerPage ? 'viewer-mode' : ''}`}>
        <Outlet />
      </main>

      {!isViewerPage && (
        <footer className="layout-footer">
          <div className="container">
            <p>Vedunya Presentation Builder v1.0.0</p>
          </div>
        </footer>
      )}
    </div>
  );
}
