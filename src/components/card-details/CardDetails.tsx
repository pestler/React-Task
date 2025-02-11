import React from 'react';
import { Person } from '../../types/types';
import './card-details.scss';
import { useNavigate } from 'react-router';

interface CardDetailsProps {
  person: Person;
}

const CardDetails: React.FC<CardDetailsProps> = ({ person }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate('/');
  };
  return (
    <div className="card-details">
      <button className="close-button btn" onClick={handleClose}>
        CLOSE
      </button>
      <h2>{person.name}</h2>
      <p>Height: {person.height}</p>
      <p>Mass: {person.mass}</p>
      <p>Hair Color: {person.hair_color}</p>
      <p>Skin Color: {person.skin_color}</p>
      <p>Eye Color: {person.eye_color}</p>
      <p>Birth Year: {person.birth_year}</p>
      <p>Gender: {person.gender}</p>
      <p>Created: {person.created}</p>
      <p>Edited: {person.edited}</p>
    </div>
  );
};

export default CardDetails;
