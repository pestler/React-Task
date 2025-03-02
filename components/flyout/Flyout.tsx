import React, { useRef, useState } from 'react';
import styles from './flyout.module.scss';
import { Item } from '../../types/types';

const Flyout = ({
  selectedItems,
  setSelectedItems,
}: {
  selectedItems: Item[];
  setSelectedItems: React.Dispatch<React.SetStateAction<Item[]>>;
}) => {
  const [csvUrl, setCsvUrl] = useState<string | null>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);

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

    setTimeout(() => {
      if (downloadRef.current) {
        downloadRef.current.click();
        URL.revokeObjectURL(url);
        setCsvUrl(null);
      }
    }, 0);
  };

  const clearSelectedItems = () => {
    setSelectedItems([]);
  };

  return (
    <div className={styles.flyout}>
      <p>Selected items: {selectedItems.length}</p>
      <button onClick={clearSelectedItems}>Clear All</button>
      <button onClick={downloadCSV}>Download CSV</button>
      <a
        ref={downloadRef}
        href={csvUrl || ''}
        download={`${selectedItems.length}_items.csv`}
        style={{ display: 'none' }}
      >
        Download
      </a>
    </div>
  );
};

export default Flyout;
