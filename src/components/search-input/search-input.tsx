import React, { Component, InputHTMLAttributes } from 'react';
import './search-input.scss';

interface SearchInputProps {
  initialSearchValue: string;
  handleSubmit: (event: React.FormEvent) => void;
}
interface SearchInputState extends InputHTMLAttributes<HTMLInputElement> {
  inputValue: string;
  handleSubmit: (event: React.FormEvent) => void;
}

class SearchInput extends Component<SearchInputProps, SearchInputState> {
  constructor(props: SearchInputProps) {
    super(props);
    this.state = {
      inputValue: this.props.initialSearchValue.trim(),
      handleSubmit: this.props.handleSubmit,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    const { inputValue } = this.state;
    return (
      <div>
        <form onSubmit={this.props.handleSubmit} className="form">
          <label>
            Name:
            <input
              type="text"
              value={inputValue}
              onChange={this.handleInputChange}
              placeholder="Enter name"
              className="input"
              autoFocus
              maxLength={20}
            />
          </label>
          <button type="submit" className="btn">
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default SearchInput;
