import { Person } from '../../types/types';
import { useTheme } from '../theme-context/useTheme';
import styles from './details.module.scss';

interface DetailsProps {
  item: Person;
  onClose: () => void;
}

const Details = ({ item, onClose }: DetailsProps) => {
  const { theme } = useTheme();

  if (!item) {
    return null;
  }

  return (
    <div
      className={styles.details}
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.color,
      }}
    >
      <button onClick={onClose}>Close</button>
      <h2>{item.name}</h2>
      <p>Gender: {item.gender}</p>
      <p>Height: {item.height}</p>
      <p>Mass: {item.mass}</p>
      <p>Hair Color: {item.hair_color}</p>
    </div>
  );
};
export default Details;
