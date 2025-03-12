import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  page: number;
  totalPages: number;
  searchTerm: string;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  searchTerm,
}) => (
  <div style={{ marginTop: '20px' }}>
    {page > 1 && (
      <Link
        href={`/?search=${encodeURIComponent(searchTerm)}&page=${page - 1}`}
        scroll={false}
      >
        Previous
      </Link>
    )}
    {page < totalPages && (
      <Link
        href={`/?search=${encodeURIComponent(searchTerm)}&page=${page + 1}`}
        scroll={false}
      >
        Next
      </Link>
    )}
  </div>
);

export default Pagination;
