import React, { Component, FormEvent } from 'react';
import './header.scss';

interface Props {
  onFormSubmit: (event: FormEvent, value: string) => void;
  value: string;
}
interface HeaderState {
  value: string;
}

class Header extends Component<Props, HeaderState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.value,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event: FormEvent) {
    event.preventDefault();
    this.props.onFormSubmit(event, this.state.value);
  }

  render() {
    return (
      <>
        <header>
          <h3>Top controls</h3>
        </header>
        <div>
          <form onSubmit={this.handleSubmit} className="form">
            <label>
              Name:
              <input
                type="text"
                value={this.state.value}
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
      </>
    );
  }
}

export default Header;
