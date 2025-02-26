
//import './card.scss';
import { Person } from '../../types/types';
//import { useNavigate, useLocation } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux';
//import { RootState } from '../../redux/store';
//import { addFavorite, removeFavorite } from '../../redux/slices/favoriteSlice';

interface CardProps {
  person: Person;
  currentPage: number;
}

const Card = ({ person, currentPage }: CardProps) => {
  const { name, gender } = person;

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const favorites = useSelector((state: RootState) => state.favorite.peoples);
  const isFavorite = favorites.some((fav) => fav.name === name);

  const handleCardClick = () => {
    if (location.pathname.includes('/details/')) {
      navigate(`/?page=${currentPage}`);
    } else {
      navigate(`/details/${name}?page=${currentPage}`);
    }
  };

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(name));
    } else {
      dispatch(addFavorite(person));
    }
  };

  return (
    <div className="card-container">
      <div
        data-testid="test-card"
        className="card-box"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
      >
        <div className="title">
          <h4>{name}</h4>
        </div>
        <div className="description">
          <h5>Gender: {gender}</h5>
        </div>
      </div>

      <div className="favorite-box">
        <button
          data-testid="favorite-button"
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
        ></button>
      </div>
    </div>
  );
};

export default Card;
