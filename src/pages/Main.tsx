import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { setHighlightWithTimeout } from '../redux/formSlice';
import Tile from '../components/Tile';

const Main = () => {
  const dispatch: AppDispatch = useDispatch();
  const { uncontrolled, controlled, highlightedIndex } = useSelector(
    (state: RootState) => state.form
  );

  useEffect(() => {
    if (highlightedIndex.uncontrolled !== null) {
      dispatch(setHighlightWithTimeout('uncontrolled', 3000));
    }
  }, [highlightedIndex.uncontrolled, dispatch]);

  useEffect(() => {
    if (highlightedIndex.controlled !== null) {
      dispatch(setHighlightWithTimeout('controlled', 3000));
    }
  }, [highlightedIndex.controlled, dispatch]);

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
                  highlightedIndex.uncontrolled === index
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
                  highlightedIndex.controlled === index
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
