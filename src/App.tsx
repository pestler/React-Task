import React, { useState } from 'react';
import './app.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from './components/theme-context/ThemeProvider';
import ErrorBoundary from './components/error-boundary/Error-boundary';
import HomePage from './pages/home-page/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import CardDetailsContainer from './components/card-details-container/card-details-container';

const App: React.FC = () => {
  const [currentPage] = useState(1);

  const routes = [
    {
      path: '/',
      element: <HomePage currentPage={currentPage} />,
      errorElement: <NotFoundPage />,
      children: [{ path: 'details/:name/', element: <CardDetailsContainer /> }],
    },
    { path: '*', element: <NotFoundPage /> },
  ];

  const router = createBrowserRouter(routes, { basename: '/React-Task' });

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
