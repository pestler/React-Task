import React, { FormEvent } from 'react';
import styles from './buttonSearch.module.scss';
import { ThemeProvider } from '../theme-context/ThemeProvider';
import { useTheme } from '../theme-context/useTheme';

interface Props {
  onFormSubmit: (event: FormEvent, value: string) => void;
  initValue: string;
}

const ButtonSearch = ({ onFormSubmit, initValue }: Props) => {
  const [inputValue, setInputValue] = React.useState<string>(initValue);

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
          <h3
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '10px',
              marginTop: '10px',
              marginLeft: '100px',
              alignItems: 'center',
            }}
          >
            Top controls
          </h3>
        </header>
        <div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label style={{ marginLeft: '20px' }}>
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
