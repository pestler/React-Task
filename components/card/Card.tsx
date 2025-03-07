import styles from './card.module.scss';
import React from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '../theme-context/useTheme';

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
  const [isFavorite, setIsFavorite] = React.useState(() =>
    selectedItems.some((item) => item.id === id)
  );

  const router = useRouter();
  const { theme } = useTheme();

  React.useEffect(() => {
    setIsFavorite(selectedItems.some((item) => item.id === id));
  }, [selectedItems, id]);

  const handleFavoriteClick = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    if (newFavoriteState) {
      setSelectedItems((prevSelectedItems) => [
        ...prevSelectedItems,
        { id, name },
      ]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item.id !== id)
      );
    }
  };

  const handleViewDetailsClick = () => {
    const isViewingCurrent = router.asPath.includes(`/details/${id}`);
    if (isViewingCurrent) {
      router.push(`/`, undefined, { shallow: true });
      onClick(undefined);
    } else {
      router.push(`/?id=${id}`, `/details/${id}`, { shallow: true });
      onClick(id);
    }
  };

  return (
    <div
      className={styles.cardContainer}
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.color,
      }}
    >
      <div className={styles.cardBox}>
        <h3>{name}</h3>
        <div
          className={styles.clickDetail}
          onClick={handleViewDetailsClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleViewDetailsClick()}
        >
          View Details
        </div>
      </div>
      <div className={styles.favoriteBox}>
        <button
          data-testid="favorite-button"
          onClick={handleFavoriteClick}
          className={`${styles.favoriteButton} ${
            isFavorite ? styles.favorite : ''
          }`}
        >
          <span className={styles.icon}>{isFavorite ? '❤️' : '♡'}</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
