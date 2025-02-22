import React, { useState } from 'react';
import './Flyout.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { clearFavorites } from '../../redux/slices/favoriteSlice';

const Flyout: React.FC = () => {
  const selectedItems = useSelector(
    (state: RootState) => state.favorite.peoples
  );
  const dispatch = useDispatch();
  const [, setCsvUrl] = useState<string | null>(null);

  if (selectedItems.length === 0) {
    return null;
  }

  const downloadCSV = () => {
    if (selectedItems.length === 0) return;

    const titleKeys = Object.keys(selectedItems[0]);
    const refinedData = [titleKeys];
    selectedItems.forEach((item) => {
      refinedData.push(
        Object.values(item).map((value) => {
          if (typeof value === 'object') {
            return JSON.stringify(value);
          }
          return String(value);
        })
      );
    });

    let csvContent = '';
    refinedData.forEach((row) => {
      csvContent += row.join(';') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    setCsvUrl(url);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedItems.length}_items.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const clearSelectedItems = () => {
    dispatch(clearFavorites());
  };

  return (
    <div className="flyout">
      <p>Selected items: {selectedItems.length}</p>
      <button onClick={clearSelectedItems}>Clear All</button>
      <button onClick={downloadCSV}>Download CSV</button>
    </div>
  );
};

export default Flyout;
