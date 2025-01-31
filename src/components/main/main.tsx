import { Component } from 'react';
import SearchInput from '../search-input/search-input';
import './main.scss';

class Main extends Component {
  render() {
    return (
      <div className="search-box">
        <SearchInput />
      </div>
    );
  }
}

export default Main;
