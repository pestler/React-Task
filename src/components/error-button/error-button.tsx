import { Component, ReactNode } from 'react';
import './error-button.scss';

class ErrorButton extends Component {
  render(): ReactNode {
    return (
      <div className="btn-box">
        <button className="btn">Error Button</button>
      </div>
    );
  }
}

export default ErrorButton;
