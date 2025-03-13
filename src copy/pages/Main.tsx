import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Main = () => {
  const { uncontrolled, controlled } = useSelector(
    (state: RootState) => state.form
  );

  return (
    <div>
      <h1>Main Page</h1>
      <h2>Uncontrolled Form Data</h2>
      {uncontrolled.map((data, index) => (
        <div
          key={index}
          style={{ border: '1px solid blue', margin: '10px', padding: '10px' }}
        >
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ))}
      <h2>Controlled Form Data</h2>
      {controlled.map((data, index) => (
        <div
          key={index}
          style={{ border: '1px solid green', margin: '10px', padding: '10px' }}
        >
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

export default Main;
