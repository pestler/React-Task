import React from 'react';
import { SortKey } from '../../types/type';

interface SortOptionsProps {
  sortKey: string | null;
  sortOrder: boolean;
  onSortKeyChange: (value: SortKey) => void;
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
        id="sort-select"
        name="sort"
        value={sortKey ?? ''}
        onChange={(e) => onSortKeyChange(e.target.value as SortKey)}
      >
        <option value="name">Sort by Name</option>
        <option value="population">Sort by Population</option>
      </select>
      <button onClick={onSortOrderToggle}>
        Sort: {sortOrder ? 'Ascending' : 'Descending'}
      </button>
    </div>
  );
};
export default SortOptions;
