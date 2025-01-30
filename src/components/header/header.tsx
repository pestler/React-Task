import { Component } from 'react';
import SearchInput from '../search-input/search-input';
import './header.scss';

class Header extends Component {
  render() {
    return (
      <header>
        <h3>Top controls</h3>
        <div className="header-box">
          <SearchInput />
        </div>
      </header>
    );
  }
}

export default Header;
