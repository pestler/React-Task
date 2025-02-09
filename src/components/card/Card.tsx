import React from 'react';
import './card.scss';
import { Person } from '../../types/types';
import { Link } from 'react-router-dom';

interface CardProps {
  person: Person;
}

const Card: React.FC<CardProps> = ({ person }) => {
  return (
    <div className="card-box">
      <div className="title">
        <h4>{person.name}</h4>
      </div>
      <div className="description">
        <h5>Gender: {person.gender}</h5>
        <h5>Birth Year: {person.birth_year}</h5>
        <Link to={`/details/${person.name}`}>More Details</Link>
      </div>
    </div>
  );
};

export default Card;
