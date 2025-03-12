import React, { useState } from 'react';
import { Person } from '../types/types';
import Flyout from './Flyout';

interface CharacterListProps {
  people: Person[];
  selectedPerson: Person | null;
  onPersonClick: (person: Person, id: number) => void;
  page: number;
}

const CharacterList: React.FC<CharacterListProps> = ({
  people,
  selectedPerson,
  onPersonClick,
  page,
}) => {
  const [selectedItems, setSelectedItems] = useState<Person[]>([]);

  const handleFavoriteToggle = (person: Person) => {
    setSelectedItems((prevItems) =>
      prevItems.some((item) => item.name === person.name)
        ? prevItems.filter((item) => item.name !== person.name)
        : [...prevItems, person]
    );
  };

  return (
    <div>
      <ul>
        {people.map((person, index) => {
          const id = index + 1 + (page - 1) * 10;
          const isFavorite = selectedItems.some(
            (item) => item.name === person.name
          );

          return (
            <li
              key={id}
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              {/* Иконка избранного */}
              <span
                onClick={() => handleFavoriteToggle(person)}
                style={{
                  cursor: 'pointer',
                  color: isFavorite ? 'red' : 'gray',
                  fontSize: '1.2rem',
                }}
              >
                {isFavorite ? '❤️' : '♡'}
              </span>
              {/* Имя персонажа */}
              <span
                onClick={() => onPersonClick(person, id)}
                style={{
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  color:
                    selectedPerson?.name === person.name ? 'blue' : 'black',
                  fontWeight:
                    selectedPerson?.name === person.name ? 'bold' : 'normal',
                }}
              >
                {person.name}
              </span>
            </li>
          );
        })}
      </ul>
      {/* Flyout для избранного */}
      <Flyout
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </div>
  );
};

export default CharacterList;
