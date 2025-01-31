import { Component } from 'react';
import SearchInput from '../search-input/search-input';
import './main.scss';

class Main extends Component {
  render() {
    return (
      <main className="main-box">
        <SearchInput />
      </main>
    );
  }
}

export default Main;
