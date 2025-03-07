import React, { FormEvent } from 'react';
import styles from './buttonSearch.module.scss';
import { useTheme } from '../theme-context/useTheme';

interface Props {
  onFormSubmit: (event: FormEvent, value: string) => void;
  initValue: string;
  placeholder?: string;
}

const ButtonSearch: React.FC<Props> = ({
  onFormSubmit,
  initValue,
  placeholder = 'Enter name',
}) => {
  const [inputValue, setInputValue] = React.useState<string>(initValue);
  const { theme } = useTheme();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onFormSubmit(event, inputValue);
  };

  return (
    <div
      className={styles.header}
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.color,
      }}
    >
      <header>
        <h3 className={styles.title}>Top controls</h3>
      </header>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="search-input" className={styles.label}>
          Name:
        </label>
        <input
          id="search-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={styles.input}
          autoFocus
          maxLength={20}
        />
        <button type="submit" className={`${styles.button} btn`}>
          Search
        </button>
      </form>
    </div>
  );
};

export default ButtonSearch;
