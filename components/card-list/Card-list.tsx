//import './card-list.scss';

import { ThemeProvider } from '../theme-context/ThemeProvider';
import { Person } from '../../types/types';
import Card from '../card/Card';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Details from '../details/detail';

interface CardProps {
  data: Person[];
}

const CardList = ({ data }: CardProps) => {
  // const { theme } = useTheme();

  const router = useRouter();
  const { index } = router.query;

  const [selectedItem, setSelectedItem] = useState<Person | null>(null);

  useEffect(() => {
    if (index !== undefined) {
      const item = data[Number(index)];
      setSelectedItem(item || null);
    }
  }, [data, index]);

  const handleCardClick = (index: number) => {
    const item = data[index];
    setSelectedItem(item || null);
    router.push(`/?index=${index}`, `/details/${index}`, { shallow: true });
  };

  const handleCloseClick = () => {
    setSelectedItem(null);
    router.push(`/`, undefined, { shallow: true });
  };

  return (
    <ThemeProvider>
      <div className="card-list">
        <div className="title-box">
          <h4>Item Name</h4>
          <h4>Item Description</h4>
        </div>
        <div className="result-box">
          <h3>Results</h3>
          {data.length > 0 ? (
            <div className="result-box-items">
              <div className="app">
                <div className="card-list">
                  {data.map((item, index) => (
                    <Card
                      key={index}
                      id={index}
                      name={item.name}
                      onClick={handleCardClick}
                    />
                  ))}
                </div>
                {selectedItem && (
                  <Details item={selectedItem} onClose={handleCloseClick} />
                )}
              </div>
            </div>
          ) : (
            <div className="result-error-description">
              <h3>No results found.</h3>
            </div>
          )}
        </div>
        {/* <Flyout /> */}
      </div>
    </ThemeProvider>
  );
};

export default CardList;
