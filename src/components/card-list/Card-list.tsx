import React from 'react';
import './card-list.scss';
import Card from '../card/Card';
import { Person } from '../../types/types';

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
  return (
    <div className="card-list">
      <div className="title-box">
        <h4>Item Name</h4>
        <h4>Item Description</h4>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <div className="result-box">
        <h3>Results</h3>
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
