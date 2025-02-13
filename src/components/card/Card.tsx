import React from 'react';
import './card.scss';
import { Person } from '../../types/types';
import { useNavigate, useLocation } from 'react-router';

interface CardProps {
  person: Person;
  currentPage: number;
}

const Card: React.FC<CardProps> = ({ person, currentPage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const isDetailsPage = location.pathname.includes('/details/');
    if (isDetailsPage) {
      navigate('/');
    } else {
      navigate(`/details/${person.name}?page=${currentPage}`);
    }
  };

  return (
    <div
      className="card-container"
      onClick={handleClick}
      data-testid="test-card"
    >
      <div className="card-box">
        <div className="title">
          <h4>{person.name}</h4>
        </div>
        <div className="description">
          <h5>Gender: {person.gender}</h5>
        </div>
      </div>
    </div>
  );
};

export default Card;
