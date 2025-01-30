import { Component } from 'react';
import './card.scss';

class Card extends Component {
  render() {
    return (
      <div className="card_box">
        <span>Item 1</span>
        <span>Description 1</span>
      </div>
    );
  }
}

export default Card;
