import React from 'react';

//import './card-details.scss';
import { useNavigate } from 'react-router';
import { useTheme } from '../theme-context/useTheme';
import { Person } from '../../types/types';

interface CardDetailsProps {
  person: Person | null;
  currentPage: number;
}

const CardDetails = ({ person, currentPage }: CardDetailsProps) => {
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
