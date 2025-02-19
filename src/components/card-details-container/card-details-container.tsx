import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import CardDetails from '../card-details/CardDetails';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchPeople } from '../../redux/services/peopleService';
import { selectPeople } from '../../redux/slices/peopleSlice';

const CardDetailsContainer: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const dispatch: AppDispatch = useDispatch();
  const personAll = useSelector((state: RootState) => selectPeople(state));
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page');
  const currentPage = page ? parseInt(page, 10) : 1;
  const query = name;
  const person = personAll.find((person) => person.name === query);

  useEffect(() => {
    if (query) {
      dispatch(fetchPeople({ query, page: currentPage }));
    }
  }, [query, location.search, dispatch, currentPage]);
  return (
    <div className="detailed-page">
      {person ? <CardDetails person={person} /> : <p>Loading...</p>}
    </div>
  );
};

export default CardDetailsContainer;
