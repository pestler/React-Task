import React, { Component, FormEvent, InputHTMLAttributes } from 'react';
import { localStorageService } from '../../service/localStorage.service';
import './search-input.scss';
import Person from '../../types/types';
import CardList from '../card-list/card-list';
import Card from '../card/card';

interface SearchInputState extends InputHTMLAttributes<HTMLInputElement> {
  inputValue: string;
  data: Person[];
  loading: boolean;
  error: string | null;
}

class SearchInput extends Component<object, SearchInputState> {
  constructor(props: object) {
    super(props);
    let inputState = localStorage.getItem('key') || '';
    inputState = inputState.replace(/['"]+/g, '');
    this.state = {
      inputValue: inputState,
      data: [],
      loading: false,
      error: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  async fetchData(query: string) {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${query}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.setState({ data: data.results, loading: false });
    } catch (error) {
      this.setState({ error: (error as Error).message, loading: false });
    }
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit(event: FormEvent) {
    event.preventDefault();
    localStorageService.set('key', this.state.inputValue.trim());
    this.fetchData(this.state.inputValue.trim());
  }

  render() {
    const { inputValue, data, loading, error } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form">
          <label>
            Name:
            <input
              type="text"
              value={inputValue}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit" className="btn">
            Search
          </button>
        </form>

        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        <CardList />
        {data.length > 0 && (
          <div className="item-box">
            {data.map((person, index) => (
              <div key={index}>
                <Card person={person} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default SearchInput;
