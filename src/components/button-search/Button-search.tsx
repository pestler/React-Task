import React, { FormEvent } from 'react';
import './button-search.scss';
import { useTheme } from '../theme-context/theme-context';

interface Props {
  onFormSubmit: (event: FormEvent, value: string) => void;
  value: string;
}

const ButtonSearch: React.FC<Props> = ({ onFormSubmit, value }) => {
  const { theme } = useTheme();
  const [inputValue, setInputValue] = React.useState<string>(value);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onFormSubmit(event, inputValue);
  };

  return (
    <>
      <header>
        <h3
          style={{
            backgroundColor: theme.backgroundColor,
            color: theme.color,
          }}
        >
          Top controls
        </h3>
      </header>
      <div>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Name:
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
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
};
export default ButtonSearch;
