import React from 'react';
import { Person } from '../types/types';

interface CharacterDetailsProps {
  selectedPerson: Person | null;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  selectedPerson,
}) => (
  <div>
    {selectedPerson ? (
      <div>
        <h2>{selectedPerson.name}</h2>
        <p>
          <strong>Height:</strong> {selectedPerson.height}
        </p>
        <p>
          <strong>Mass:</strong> {selectedPerson.mass}
        </p>
        <p>
          <strong>Hair Color:</strong> {selectedPerson.hair_color}
        </p>
        <p>
          <strong>Skin Color:</strong> {selectedPerson.skin_color}
        </p>
        <p>
          <strong>Eye Color:</strong> {selectedPerson.eye_color}
        </p>
        <p>
          <strong>Birth Year:</strong> {selectedPerson.birth_year}
        </p>
        <p>
          <strong>Gender:</strong> {selectedPerson.gender}
        </p>
      </div>
    ) : (
      <p>Click on a character to see details here.</p>
    )}
  </div>
);

export default CharacterDetails;
