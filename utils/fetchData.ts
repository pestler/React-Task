import { GetServerSideProps } from 'next';

import { Person } from 'types/types';
import { fetchPeople } from './utils';

export type InitialProps = {
  initialPeople: Person[];
  initialSearchQuery: string;
};

export const getServerSideProps: GetServerSideProps<
  InitialProps
> = async () => {
  const initialPeople = await fetchPeople();
  const initialSearchQuery = '';

  return {
    props: { initialPeople, initialSearchQuery },
  };
};
