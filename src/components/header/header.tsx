import { Component } from 'react';
import './header.scss';
import SearchInput from '../search-input/search-input';

interface HeaderProps {
  initialSearchValue: string;
  handleSubmit: (event: React.FormEvent) => void;
}
interface HeaderState {
  inputValue: string;
  handleSubmit: (event: React.FormEvent) => void;
}
class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      inputValue: this.props.initialSearchValue,
      handleSubmit: this.props.handleSubmit,
    };
  }
  render() {
    const { initialSearchValue, handleSubmit } = this.props;
    console.log('2222', this.state.inputValue);
    return (
      <header>
        <h3>Top controls</h3>
        <SearchInput
          initialSearchValue={initialSearchValue}
          handleSubmit={handleSubmit}
        />
      </header>
    );
  }
}

export default Header;
