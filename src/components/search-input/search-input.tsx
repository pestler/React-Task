import React, { Component, FormEvent, InputHTMLAttributes } from 'react';
import { localStorageService } from '../../service/localStorage.service';
import './search-input.scss';
interface SearchInputState extends InputHTMLAttributes<HTMLInputElement> {
  inputValue: string;
}

class SearchInput extends Component<object, SearchInputState> {
  constructor(props: object) {
    super(props);
    let inputValue = localStorage.getItem('key') || '';
    inputValue = inputValue.replace(/['"]+/g, '');
    this.state = {
      inputValue,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit(event: FormEvent) {
    event.preventDefault();
    localStorageService.set('key', this.state.inputValue.trim());
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <label>
          Name:
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
        </label>
        <button type="submit" className="btn">
          Search
        </button>
      </form>
    );
  }
}

export default SearchInput;
