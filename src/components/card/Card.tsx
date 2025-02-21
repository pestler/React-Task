import React, { useEffect } from 'react';
import './card.scss';
import { Person } from '../../types/types';
import { useNavigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addFavorite, removeFavorite } from '../../redux/slices/favoriteSlice';

interface CardProps {
  person: Person;
  currentPage: number;
}

const Card: React.FC<CardProps> = ({ person, currentPage }) => {
  const { name, gender } = person;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const favorite = useSelector((state: RootState) => state.favorite.items);
  const [checked, setChecked] = React.useState(false);

  const handleClick = () => {
    const isDetailsPage = location.pathname.includes('/details/');
    if (isDetailsPage) {
      navigate(`/?page=${currentPage}`);
    } else {
      navigate(`/details/${name}?page=${currentPage}`);
    }
  };

  const favoriteClick = (name: string) => {
    if (favorite.some((item) => item === name)) {
      dispatch(removeFavorite(name));
      setChecked(false);
      console.log(checked);
    } else {
      if (name) {
        dispatch(addFavorite(name));
        setChecked(true);
        console.log(checked);
      }
    }
  };

  useEffect(() => {
    setChecked(favorite.some((item) => item === name));
  }, [favorite, checked, name]);

  return (
    <div className="card-container" data-testid="test-card">
      <div className="card-box" onClick={handleClick}>
        <div className="title">
          <h4>{name}</h4>
        </div>
        <div className="description">
          <h5>Gender: {gender}</h5>
        </div>
      </div>
      <div className="favorite-box">
        <button
          className={`favorite-button ${checked ? 'active' : ''}`}
          onClick={() => favoriteClick(name)}
        ></button>
      </div>
    </div>
  );
};

export default Card;
