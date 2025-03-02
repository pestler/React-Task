import styles from './card.module.scss';
import React from 'react';
import { useRouter } from 'next/router';

interface Item {
  id: number;
  name: string;
  [key: string]: unknown;
}

interface CardProps {
  id: number;
  name: string;
  onClick: (id?: number) => void;
  selectedItems: Item[];
  setSelectedItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const Card = ({
  id,
  name,
  onClick,
  selectedItems,
  setSelectedItems,
}: CardProps) => {
  const [isFavorite, setIsFavorite] = React.useState(() => {
    return selectedItems.some((item) => item.id === id);
  });

  const router = useRouter();

  React.useEffect(() => {
    setIsFavorite(selectedItems.some((item) => item.id === id));
  }, [selectedItems, id]);

  const handleFavoriteClick = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    if (newFavoriteState) {
      setSelectedItems([...selectedItems, { id, name }]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item.id !== id));
    }
  };

  const handleViewDetailsClick = () => {
    const currentUrl = router.asPath;
    const newUrl = `/details/${id}`;

    if (currentUrl === newUrl) {
      router.push(`/`, undefined, { shallow: true });
      onClick(undefined);
    } else {
      router.push(`/?id=${id}`, newUrl, { shallow: true });
      onClick(id);
    }
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardBox}>
        <h3>{name}</h3>
        <div className={styles.clickDetail} onClick={handleViewDetailsClick}>
          View Details
        </div>
      </div>
      <div className={styles.favoriteBox}>
        <button
          data-testid="favorite-button"
          onClick={handleFavoriteClick}
          className={isFavorite ? 'favorite' : ''}
          style={{ cursor: 'pointer' }}
        >
          <span className={styles.icon}>{isFavorite ? '❤️' : '♡'}</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
