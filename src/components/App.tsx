import React, { useState } from 'react';
import './app.scss';
import { createBrowserRouter, RouterProvider } from 'react-router';
import HomePage from '../pages/home-page/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import DetailedPage from '../pages/detailed-page/DetailedPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const PageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage currentPage={currentPage} onPageChange={PageChange} />,
      errorElement: <NotFoundPage />,
      children: [{ path: 'details/:name', element: <DetailedPage /> }],
    },
    { path: '*', element: <NotFoundPage /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
