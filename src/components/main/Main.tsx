import React from 'react';

import './main.scss';

import Person from '../../types/types';
import CardList from '../card-list/Card-list';

interface MainProps {
  data: Person[];
  loading: boolean;
  error: string | null;
}

const Main: React.FC<MainProps> = ({ data, loading, error }) => {
  return (
    <main className="main-box">
      <CardList data={data} loading={loading} error={error} />
    </main>
  );
};

export default Main;
