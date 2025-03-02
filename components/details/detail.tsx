import { Person } from '../../types/types';
import { ThemeProvider } from '../theme-context/ThemeProvider';
import styles from './details.module.scss';

interface DetailsProps {
  item: Person;
  onClose: () => void;
}

const Details = ({ item, onClose }: DetailsProps) => {
  if (!item) {
    return null;
  }

  return (
    <ThemeProvider>
      <div className={styles.details}>
        <button onClick={onClose}>Close</button>
        <h2>{item.name}</h2>
        <p>Gender: {item.gender}</p>
        <p>Height: {item.height}</p>
        <p>Mass: {item.mass}</p>
        <p>Hair Color: {item.hair_color}</p>
      </div>
    </ThemeProvider>
  );
};

export default Details;
