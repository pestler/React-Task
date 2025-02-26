//import './main.scss';
import CardList from '../card-list/Card-list';
import { Person } from '../../src/types/types';

interface MainProps {
  data?: Person[];
  loading?: boolean;
  error?: string | null;
  currentPage: number;
}

const Main = ({ data, loading, error, currentPage }: MainProps) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  /*  if (data.length === 0) {
    return <div className="no-results-message">No results found.</div>;
  } */

  return (
    <main className="main-box">
      <CardList
        /*  data={data}
        loading={loading}
        error={error} */
        currentPage={currentPage}
      />
    </main>
  );
};

export default Main;
