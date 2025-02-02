import { Component } from 'react';

import './main.scss';
import CardList from '../card-list/card-list';
import Person from '../../types/types';

interface MainProps {
  searchValue: string;
  data: Person[];
  loading: boolean;
  error: string | null;
}

type MainState = unknown;
class Main extends Component<MainProps, MainState> {
  render() {
    return (
      <main className="main-box">
        <CardList
          searchValue={this.props.searchValue}
          data={this.props.data}
          loading={this.props.loading}
          error={this.props.error}
        />
      </main>
    );
  }
}

export default Main;
