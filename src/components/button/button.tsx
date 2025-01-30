import { Component } from 'react';
import './button.scss';

class Button extends Component {
  render() {
    return <button onClick={() => console.log('555')}>button </button>;
  }
}

export default Button;
