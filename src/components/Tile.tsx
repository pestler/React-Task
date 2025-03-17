import React from 'react';

interface TileProps {
  title: string;
  data: Record<string, string | number>;
}

const Tile: React.FC<TileProps> = ({ title, data }) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px',
        textAlign: 'left',
      }}
    >
      <h3>{title}</h3>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          alignItems: 'center',
        }}
      >
        {Object.entries(data).map(([key, value], index) => (
          <li key={index}>
            <strong>{key}:</strong>{' '}
            {key === 'picture' ? (
              <img
                src={value as string}
                alt="Preview"
                style={{
                  maxWidth: '30px',
                  marginLeft: '10px',
                  marginRight: '10px',
                }}
              />
            ) : (
              value
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tile;
