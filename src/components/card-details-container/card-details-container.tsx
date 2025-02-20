import React from 'react';
import { useLocation, useParams } from 'react-router';
import CardDetails from '../card-details/CardDetails';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { selectPeople } from '../../redux/slices/peopleSlice';

const CardDetailsContainer: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const personAll = useSelector((state: RootState) => selectPeople(state));
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page');
  const currentPage = page ? parseInt(page, 10) : 1;
  const query = name;
  const person = personAll.find((person) => person.name === query);

  return (
    <div className="detailed-page">
      {person ? (
        <CardDetails person={person} currentPage={currentPage} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CardDetailsContainer;
