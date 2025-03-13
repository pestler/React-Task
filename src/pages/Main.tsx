import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Tile from '../components/Tile';

const Main = () => {
  const { uncontrolled, controlled } = useSelector(
    (state: RootState) => state.form
  );

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
                border: '1px solid blue',
                margin: '10px',
                padding: '10px',
              }}
            >
              <Tile
                key={index}
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
                border: '1px solid red',
                margin: '10px',
                padding: '10px',
              }}
            >
              <Tile
                key={index}
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
