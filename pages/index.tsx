import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import HomePage from './HomePage';
import { fetchPeople } from '@utils/utils';

const Index = ({
  initialPeople,
  initialSearchQuery,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(initialPeople, 'initialPeople');
  return (
    <div>
      <HomePage
        initialPeople={initialPeople}
        initialSearchQuery={initialSearchQuery}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const initialSearchQuery = context.query.searchQuery || '';
  const initialPeople = await fetchPeople();

  return {
    props: {
      initialPeople,
      initialSearchQuery,
    },
  };
};

export default Index;
