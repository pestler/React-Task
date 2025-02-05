import { Component } from 'react';

import './main.scss';

import Person from '../../types/types';
import CardList from '../card-list/Card-list';

interface MainProps {
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
          data={this.props.data}
          loading={this.props.loading}
          error={this.props.error}
        />
      </main>
    );
  }
}

export default Main;
