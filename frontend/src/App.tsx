import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PresentationsList } from './pages/PresentationsList';
import { PresentationViewer } from './viewer/PresentationViewer';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PresentationsList />} />
          <Route path="/view/:id" element={<PresentationViewer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
