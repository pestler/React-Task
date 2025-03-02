import styles from './card-list.module.scss';
import { ThemeProvider } from '../theme-context/ThemeProvider';
import { Item, Person } from '../../types/types';
import Card from '../card/Card';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Details from '../details/detail';
import Flyout from '../flyout/Flyout';

interface CardProps {
  data: Person[];
  page: number;
}

const CardList = ({ data, page }: CardProps) => {
  const router = useRouter();
  const { index } = router.query;

  const [selectedItem, setSelectedItem] = useState<Person | null>(null);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  useEffect(() => {
    if (index !== undefined) {
      const item = data[Number(index)];
      setSelectedItem(item || null);
    }
  }, [data, index]);

  const handleCardClick = (id?: number) => {
    if (id === undefined) {
      setSelectedItem(null);
    } else {
      const item = data[id];
      setSelectedItem(item || null);
    }
  };

  const handleCloseClick = () => {
    setSelectedItem(null);
    router.push(`/`, undefined, { shallow: true });
  };

  return (
    <ThemeProvider>
      <div className={styles.cardList}>
        <div className={styles.titleBox}>
          <h4>Item Name</h4>
          <h4>Item Description</h4>
        </div>
        <div className={styles.resultBox}>
          <h3 className={styles.title}>Results</h3>
          {data.length > 0 ? (
            <div className={styles.resultBoxItems}>
              <div className={styles.cardContainer}>
                {data.map((item, index) => (
                  <Card
                    key={index}
                    id={(page - 1) * 10 + index}
                    name={item.name}
                    onClick={handleCardClick}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                  />
                ))}
              </div>
              {selectedItem && (
                <Details item={selectedItem} onClose={handleCloseClick} />
              )}
            </div>
          ) : (
            <div className={styles.resultErrorDescription}>
              <h3>No results found.</h3>
            </div>
          )}
        </div>
        <Flyout
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </div>
    </ThemeProvider>
  );
};

export default CardList;
