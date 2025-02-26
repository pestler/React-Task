//import './card-list.scss';
//import Card from '../card/Card';

//import { useTheme } from '../theme-context/useTheme';
import { ThemeProvider } from '../theme-context/ThemeProvider';
import { Person } from '../../types/types';

interface CardProps {
  data?: Person[];
  loading?: boolean;
  error?: string | null;
  currentPage: number;
}

const CardList = ({ loading, error }: CardProps) => {
  // const { theme } = useTheme();

  return (
    <ThemeProvider>
      <div className="card-list">
        <div className="title-box">
          <h4>Item Name</h4>
          <h4>Item Description</h4>
        </div>

        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        <div className="result-box">
          <h3>Results</h3>
          {/*  {data.length > 0 ? (
            <div className="result-box-items">
              <div className="item-box">
                {data.map((person, index) => (
                  <div key={index}>
                    <Card
                      key={person.name}
                      person={person}
                      currentPage={currentPage}
                    />
                  </div>
                ))}
              </div>
              <Outlet />
            </div>
          ) : (
            <div className="result-error-description">
              <h3>No results found.</h3>
            </div>
          )} */}
        </div>
        {/* <Flyout /> */}
      </div>
    </ThemeProvider>
  );
};

export default CardList;
