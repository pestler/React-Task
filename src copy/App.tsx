import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Main from './pages/Main';
import UncontrolledFormPage from './pages/UncontrolledFormPage';
import ControlledFormPage from './pages/ControlledFormPage';

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Main</Link> |{' '}
        <Link to="/uncontrolled">Uncontrolled Form</Link> |{' '}
        <Link to="/controlled">Controlled Form</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/uncontrolled" element={<UncontrolledFormPage />} />
        <Route path="/controlled" element={<ControlledFormPage />} />
      </Routes>
    </Router>
  );
};

export default App;
