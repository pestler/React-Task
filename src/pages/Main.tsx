import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Tile from '../components/Tile';

const Main = () => {
  const { uncontrolled, controlled } = useSelector(
    (state: RootState) => state.form
  );

  const highLightLastTitle = (
    lenght: number,
    setHighLight: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    if (lenght > 0) {
      setHighLight(lenght - 1);
      const timer = setTimeout(() => {
        setHighLight(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  };

  const [lastUncontrolledHighlighted, setLastUncontrolledHighlighted] =
    useState<number | null>(null);

  const [lastControlledHighlighted, setLastControlledHighlighted] = useState<
    number | null
  >(null);

  useEffect(() => {
    return highLightLastTitle(
      uncontrolled.length,
      setLastUncontrolledHighlighted
    );
  }, [uncontrolled]);

  useEffect(() => {
    return highLightLastTitle(controlled.length, setLastControlledHighlighted);
  }, [controlled]);

  return (
    <div>
      <h1>Main Page</h1>

      <h2>Uncontrolled Form Data</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {uncontrolled.length === 0 ? (
          <p>No data available</p>
        ) : (
          uncontrolled.map((data, index) => (
            <div
              key={index}
              style={{
                border:
                  lastUncontrolledHighlighted === index
                    ? '3px solid green'
                    : '1px solid blue',
                margin: '10px',
                padding: '10px',
                transition: 'border-color 0.3s ease',
              }}
            >
              <Tile
                title={`#${index + 1}`}
                data={data as unknown as Record<string, string | number>}
              />
            </div>
          ))
        )}
      </div>

      <hr />

      <h2>Controlled Form Data</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {controlled.length === 0 ? (
          <p>No data available</p>
        ) : (
          controlled.map((data, index) => (
            <div
              key={index}
              style={{
                border:
                  lastControlledHighlighted === index
                    ? '3px solid green'
                    : '1px solid red',
                margin: '10px',
                padding: '10px',
                transition: 'border-color 0.3s ease',
              }}
            >
              <Tile
                title={`#${index + 1}`}
                data={data as unknown as Record<string, string | number>}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Main;
