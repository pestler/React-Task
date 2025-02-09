import React from 'react';
import './app.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/home-page/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import DetailedPage from '../pages/detailed-page/DetailedPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      { path: 'details/:name', element: <DetailedPage /> },
      { path: ':id', element: <DetailedPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
