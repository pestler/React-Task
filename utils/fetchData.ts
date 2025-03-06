import { GetServerSideProps } from 'next';
import { fetchPeople } from '@utils/utils';
import { Person } from 'types/types';

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
