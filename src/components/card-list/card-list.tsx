import { Component } from 'react';
import './card-list.scss';
import Person from '../../types/types';
import Card from '../card/card';

interface CardState {
  searchValue: string;
  data: Person[];
  loading: boolean;
  error: string | null;
}
type CardProps = unknown;

class CardList extends Component<CardState, CardProps> {
  constructor(props: CardState) {
    super(props);
    this.state = {
      searchValue: '',
      data: [],
      loading: false,
      error: null,
    };
  }
  render() {
    return (
      <div className="card-list">
        <div className="title-box">
          <h4>Item Name</h4>
          <h4>Item Description</h4>
        </div>

        {this.props.loading && <div>Loading...</div>}
        {this.props.error && <div>error</div>}
        <div className="result-box">
          <h3>Results</h3>
          {this.props.data.length > 0 ? (
            <div className="result-box-items">
              <div className="item-box">
                {this.props.data.map((person, index) => (
                  <div key={index}>
                    <Card person={person} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="result-error-description">
              <h3>Error description</h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CardList;
