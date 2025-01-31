import { Component } from 'react';
import './card.scss';
import Person from '../../types/types';

interface ChildProps {
  person: Person;
}
class Card extends Component<ChildProps> {
  render() {
    return (
      <div className="card_box">
        <div className="title">
          <h4>{this.props.person.name}</h4>
        </div>
        <div className="description">
          <h5>Height: {this.props.person.height}</h5>
          <h5>Mass: {this.props.person.mass}</h5>
          <h5>Hair Color: {this.props.person.hair_color}</h5>
          <h5>Skin Color: {this.props.person.skin_color}</h5>
          <h5>Eye Color: {this.props.person.eye_color}</h5>
          <h5>Birth Year: {this.props.person.birth_year}</h5>
          <h5>Gender: {this.props.person.gender}</h5>
        </div>
      </div>
    );
  }
}

export default Card;
