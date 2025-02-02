import { Component, FormEvent } from 'react';
import './app.scss';
import Main from './main/main';
import Header from './header/header';
import ErrorButton from './error-button/error-button';
import Person from '../types/types';
import { localStorageService } from '../service/localStorage.service';

interface AppState {
  searchValue: string;
  data: Person[];
  loading: boolean;
  error: string | null;
}

type AppProps = unknown;

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      searchValue: localStorageService.get('key') || '',
      data: [],
      loading: false,
      error: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: FormEvent) {
    event.preventDefault();
    localStorageService.set('key', this.state.searchValue.trim());
    console.log('object', this.state.searchValue);
    this.fetchData(this.state.searchValue.trim());
  }

  async fetchData(query: string) {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${query}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      this.setState({ data: data.results, loading: false });
    } catch (error) {
      this.setState({ error: (error as Error).message, loading: false });
    }
  }

  render() {
    return (
      <div className="container">
        <Header
          initialSearchValue={this.state.searchValue}
          handleSubmit={this.handleSubmit}
        />
        <Main
          searchValue={this.state.searchValue}
          data={this.state.data}
          loading={this.state.loading}
          error={this.state.error}
        />
        <ErrorButton />
      </div>
    );
  }
}

export default App;
