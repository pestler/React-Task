import { Component, FormEvent } from 'react';
import './app.scss';
import Person from '../types/types';
import { localStorageService } from '../service/localStorage.service';
import ErrorButton from './error-button/Error-button';
import Header from './header/Header';
import Main from './main/Main';

interface AppState {
  value: string;
  data: Person[];
  loading: boolean;
  error: string | null;
}

type AppProps = unknown;

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      value: localStorageService.get('key') || '',
      data: [],
      loading: false,
      error: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.fetchData(this.state.value);
  }

  handleSubmit(event: FormEvent, value: string) {
    event.preventDefault();
    this.setState({ value }, () => {
      localStorageService.set('key', value);
      this.fetchData(value);
    });
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
        <Header onFormSubmit={this.handleSubmit} value={this.state.value} />
        <Main
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
