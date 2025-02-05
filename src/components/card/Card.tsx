import React from 'react';
import './card.scss';
import Person from '../../types/types';

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
        <h5>Height: {person.height}</h5>
        <h5>Mass: {person.mass}</h5>
        <h5>Hair Color: {person.hair_color}</h5>
        <h5>Skin Color: {person.skin_color}</h5>
        <h5>Eye Color: {person.eye_color}</h5>
        <h5>Birth Year: {person.birth_year}</h5>
        <h5>Gender: {person.gender}</h5>
      </div>
    </div>
  );
};

export default Card;
