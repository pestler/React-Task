import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Main = lazy(() => import('./pages/Main'));

const Navigation = () => {
  return (
    <nav style={{ marginBottom: '20px' }}>
      <Link to="/">Main</Link>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
