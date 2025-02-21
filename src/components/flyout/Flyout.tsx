import React from 'react';
import './Flyout.scss';

interface FlyoutProps {
  selectedItems: string[];
}

const Flyout: React.FC<FlyoutProps> = ({ selectedItems }) => {
  console.log(selectedItems);
  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className="flyout">
      <p>Selected items: {selectedItems.length}</p>
    </div>
  );
};

export default Flyout;
