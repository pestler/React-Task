import React from 'react';
import { useLocation, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import CardDetails from '../card-details/CardDetails';
import { RootState } from '../../redux/store';
import { selectPeople } from '../../redux/slices/peoplesSlice';
import { ThemeProvider } from '../theme-context/ThemeProvider';

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
    <ThemeProvider>
      <div className="detailed-page">
        {person ? (
          <CardDetails person={person} currentPage={currentPage} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CardDetailsContainer;
