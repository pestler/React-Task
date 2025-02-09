import React from 'react';
import './pagination.scss';

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
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="btn"
      >
        Назад
      </button>
      <span>Текущая: {currentPage}</span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="btn"
      >
        Вперед
      </button>
    </div>
  );
};

export default Pagination;
