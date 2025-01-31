import { Component } from 'react';
import './app.scss';
import Main from './main/main';
import Header from './header/header';
import ErrorButton from './error-bytton/error-button';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Main />
        <ErrorButton />
      </div>
    );
  }
}

export default App;
