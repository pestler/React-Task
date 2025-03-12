import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
}) => (
  <form onSubmit={onSearchSubmit} style={{ marginBottom: '10px' }}>
    <input
      type="text"
      placeholder="Search by name..."
      value={searchTerm}
      onChange={onSearchChange}
      style={{
        padding: '5px',
        width: '100%',
        borderRadius: '4px',
        border: '1px solid #ccc',
      }}
    />
    <button
      type="submit"
      style={{
        marginTop: '10px',
        padding: '5px 10px',
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      Search
    </button>
  </form>
);

export default SearchBar;
