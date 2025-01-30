import { Component } from 'react';
import Card from '../card/card';
import './card-list.scss';

class CardList extends Component {
  render() {
    return (
      <>
        <div className="card_list">
          <h3>Results</h3>
          <div className="title_box">
            <h4>Item Name</h4>
            <h4>Item Description</h4>
          </div>
          <div className="card_list-box">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </>
    );
  }
}

export default CardList;
