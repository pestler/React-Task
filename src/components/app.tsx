import { Component } from 'react';
import './app.scss';
import Main from './main/main';
import Header from './header/header';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
