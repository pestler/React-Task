import React, { Component, FormEvent } from 'react';
import './search-input.scss';

interface SearchInputState {
  inputValue: string;
}

class SearchInput extends Component<object, SearchInputState> {
  constructor(props: object) {
    super(props);
    this.state = {
      inputValue: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit(event: FormEvent) {
    event.preventDefault();
    alert(`Form submitted with input: ${this.state.inputValue}`);
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
          Button
        </button>
      </form>
    );
  }
}

export default SearchInput;
