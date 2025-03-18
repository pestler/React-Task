import React from 'react';

interface FilterDropdownProps {
  filterRegion: string;
  setFilterRegion: (region: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  filterRegion,
  setFilterRegion,
}) => {
  return (
    <select
      value={filterRegion || ' '}
      onChange={(e) => setFilterRegion(e.target.value)}
    >
      <option value="">All Regions</option>
      <option value="Africa">Africa</option>
      <option value="Americas">Americas</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  );
};

export default FilterDropdown;
