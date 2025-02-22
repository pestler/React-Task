import React from 'react';
import './Flyout.scss';

interface FlyoutProps {
  selectedItems: string[];
  clearSelectedItems: () => void;
}

const Flyout: React.FC<FlyoutProps> = ({
  selectedItems,
  clearSelectedItems,
}) => {
  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className="flyout">
      <p>Selected items: {selectedItems.length}</p>
      <button onClick={clearSelectedItems}>Clear All</button>
    </div>
  );
};

export default Flyout;
