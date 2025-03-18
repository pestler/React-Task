import React from 'react';

interface SortOptionsProps {
  sortKey: string | null;
  sortOrder: boolean;
  onSortKeyChange: (value: string) => void;
  onSortOrderToggle: () => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({
  sortKey,
  sortOrder,
  onSortKeyChange,
  onSortOrderToggle,
}) => {
  return (
    <div>
      <select
        value={sortKey || ''}
        onChange={(e) => onSortKeyChange(e.target.value)}
      >
        <option value="name">Sort by Name</option>
        <option value="population">Sort by Population</option>
      </select>
      <button onClick={onSortOrderToggle}>
        Order: {sortOrder ? 'Sort Ascending' : 'Sort Descending'}
      </button>
    </div>
  );
};
export default SortOptions;
