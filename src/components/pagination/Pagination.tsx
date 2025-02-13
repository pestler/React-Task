import React from 'react';
import './pagination.scss';
import { useLocation, useNavigate } from 'react-router';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    navigate(`${location.pathname}?${searchParams.toString()}`);
    onPageChange(page);
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          className={`btn ${page === currentPage ? 'active' : ''}`}
          key={page}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
