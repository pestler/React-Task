import React from 'react';
import './card-list.scss';
import Card from '../card/Card';
import { Person } from '../../types/types';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../theme-context/theme-context';

interface CardProps {
  data: Person[];
  loading: boolean;
  error: string | null;
  currentPage: number;
}

const CardList: React.FC<CardProps> = ({
  data,
  loading,
  error,
  currentPage,
}) => {
  const { theme } = useTheme();
  return (
    <div className="card-list">
      <div className="title-box">
        <h4>Item Name</h4>
        <h4>Item Description</h4>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <div className="result-box">
        <h3
          style={{
            backgroundColor: theme.backgroundColor,
            color: theme.color,
          }}
        >
          Results
        </h3>
        {data.length > 0 ? (
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
        )}
      </div>
    </div>
  );
};

export default CardList;
