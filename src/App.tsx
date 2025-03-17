import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Main = lazy(() => import('./pages/Main'));
const UncontrolledFormPage = lazy(() => import('./pages/UncontrolledFormPage'));
const ControlledFormPage = lazy(() => import('./pages/ControlledFormPage'));

const Navigation = () => {
  const location = useLocation();

  return (
    <nav style={{ marginBottom: '20px' }}>
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          padding: '5px 10px',
          color: location.pathname === '/' ? 'white' : 'blue',
          backgroundColor: location.pathname === '/' ? 'blue' : 'transparent',
          borderRadius: '5px',
        }}
      >
        Main
      </Link>{' '}
      |{' '}
      <Link
        to="/uncontrolled"
        style={{
          textDecoration: 'none',
          padding: '5px 10px',
          color: location.pathname === '/uncontrolled' ? 'white' : 'blue',
          backgroundColor:
            location.pathname === '/uncontrolled' ? 'blue' : 'transparent',
          borderRadius: '5px',
        }}
      >
        Uncontrolled Form
      </Link>{' '}
      |{' '}
      <Link
        to="/controlled"
        style={{
          textDecoration: 'none',
          padding: '5px 10px',
          color: location.pathname === '/controlled' ? 'white' : 'blue',
          backgroundColor:
            location.pathname === '/controlled' ? 'blue' : 'transparent',
          borderRadius: '5px',
        }}
      >
        Controlled Form
      </Link>
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
          <Route path="/uncontrolled" element={<UncontrolledFormPage />} />
          <Route path="/controlled" element={<ControlledFormPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
