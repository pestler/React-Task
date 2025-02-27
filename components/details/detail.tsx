import { Person } from '../../types/types';

interface DetailsProps {
  item: Person;
  onClose: () => void;
}

const Details = ({ item, onClose }: DetailsProps) => {
  if (!item) {
    return null;
  }

  return (
    //<ThemeProvider>
    <div className="details">
      <button onClick={onClose}>Close</button>
      <h2>{item.name}</h2>
      <p>Gender: {item.gender}</p>
      <p>Height: {item.height}</p>
      <p>Mass: {item.mass}</p>
      <p>Hair Color: {item.hair_color}</p>
    </div>
    //</ThemeProvider>
  );
};

export default Details;
