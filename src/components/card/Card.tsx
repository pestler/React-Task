import React from 'react';
import './card.scss';
import { Person } from '../../types/types';
import { useNavigate, useLocation } from 'react-router-dom';

interface CardProps {
  person: Person;
}

const Card: React.FC<CardProps> = ({ person }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const isDetailsPage = location.pathname.includes('/details/');
    if (isDetailsPage) {
      navigate('/');
    } else {
      navigate(`/details/${person.name}`);
    }
  };

  return (
    <div className="card-container" onClick={handleClick}>
      <div className="card-box">
        <div className="title">
          <h4>{person.name}</h4>
        </div>
        <div className="description">
          <h5>Gender: {person.gender}</h5>
          <h5>Birth Year: {person.birth_year}</h5>
        </div>
      </div>
    </div>
  );
};

export default Card;
