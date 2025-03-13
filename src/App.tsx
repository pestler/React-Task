import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Main = lazy(() => import('./pages/Main'));
const UncontrolledFormPage = lazy(() => import('./pages/UncontrolledFormPage'));
const ControlledFormPage = lazy(() => import('./pages/ControlledFormPage'));

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Main</Link> |{' '}
        <Link to="/uncontrolled">Uncontrolled Form</Link> |{' '}
        <Link to="/controlled">Controlled Form</Link>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/uncontrolled" element={<UncontrolledFormPage />} />
          <Route path="/controlled" element={<ControlledFormPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
