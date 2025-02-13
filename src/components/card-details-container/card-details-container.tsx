import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Person } from '../../types/types';
import CardDetails from '../card-details/CardDetails';

const CardDetailsContainer: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    const fetchPerson = async () => {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${name}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setPerson(data.results[0]);
      }
    };

    fetchPerson();
  }, [name]);

  return (
    <div className="detailed-page">
      {person ? <CardDetails person={person} /> : <p>Loading...</p>}
    </div>
  );
};

export default CardDetailsContainer;
