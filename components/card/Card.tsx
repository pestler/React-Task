//import './card.scss';
import Link from 'next/link';
import React from 'react';

interface CardProps {
  id: number;
  name: string;
  onClick: (id: number) => void;
}

const Card = ({ id, name, onClick }: CardProps) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  React.useEffect(() => {
    const storedFavorite = localStorage.getItem(`favorite_${name}`);
    setIsFavorite(storedFavorite === 'true');
  }, [name]);

  const handleFavoriteClick = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    if (newFavoriteState) {
      localStorage.setItem(`favorite_${name}`, 'true');
    } else {
      localStorage.removeItem(`favorite_${name}`);
    }
  };

  return (
    <div className="card-container">
      <div className="card-box">
        <h4>{name}</h4>
        <Link href={`/?id=${id}`} as={`/details/${id}`}>
          <div onClick={() => onClick(id)}>View Details</div>
        </Link>
      </div>
      <div className="favorite-box">
        <button
          data-testid="favorite-button"
          onClick={handleFavoriteClick}
          className={isFavorite ? 'favorite' : ''}
        >
          {isFavorite ? '❤️' : '♡'}
        </button>
      </div>
    </div>
  );
};
export default Card;
