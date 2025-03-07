import { getServerSideProps } from '../utils/fetchData';
import HomePage from './HomePage';
import { InferGetServerSidePropsType } from 'next';

export default function Page({
  initialPeople,
  initialSearchQuery,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <HomePage
        initialPeople={initialPeople}
        initialSearchQuery={initialSearchQuery}
      />
    </div>
  );
}

export { getServerSideProps };
