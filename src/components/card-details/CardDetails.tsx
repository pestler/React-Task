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
    navigate(`/?page=${currentPage}`);
  };
  return (
    <div className="card-details">
      <button className="close-button btn" onClick={handleClose}>
        CLOSE
      </button>
      <h2>{person.name}</h2>
      <p>Gender: {person.gender}</p>
      <p>Height: {person.height}</p>
      <p>Mass: {person.mass}</p>
      <p>Hair Color: {person.hair_color}</p>
    </div>
  );
};

export default CardDetails;
