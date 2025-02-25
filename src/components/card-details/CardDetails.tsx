import React from 'react';
import { Person } from '../../types/types';
import './card-details.scss';
import { useNavigate } from 'react-router';
import { useTheme } from '../theme-context/useTheme';

interface CardDetailsProps {
  person: Person | null;
  currentPage: number;
}

const CardDetails: React.FC<CardDetailsProps> = ({ person, currentPage }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const handleClose = () => {
    const isDetailsPage = location.pathname.includes('/details/');
    if (isDetailsPage) {
      navigate(`/?page=${currentPage}`);
    } else {
      if (person) {
        navigate(`/details/${person.name}?page=${currentPage}`);
      }
    }
  };

  if (!person) {
    return null;
  }

  return (
    <div
      className="card-details"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.color,
      }}
    >
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
