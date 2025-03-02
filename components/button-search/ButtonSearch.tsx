import React, { FormEvent } from 'react';
import styles from './buttonSearch.module.scss';
import { ThemeProvider } from '../theme-context/ThemeProvider';
import { useTheme } from '../theme-context/useTheme';

interface Props {
  onFormSubmit: (event: FormEvent, value: string) => void;
}

const ButtonSearch = ({ onFormSubmit }: Props) => {
  const [inputValue, setInputValue] = React.useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onFormSubmit(event, inputValue);
  };
  const { theme } = useTheme();

  return (
    <ThemeProvider>
      <div
        className={styles.header}
        style={{
          backgroundColor: theme.backgroundColor,
          color: theme.color,
        }}
      >
        <header>
          <h3>Top controls</h3>
        </header>
        <div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>
              Name:
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter name"
                className={styles.input}
                autoFocus
                maxLength={20}
              />
            </label>
            <button type="submit" className="btn">
              Search
            </button>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ButtonSearch;
