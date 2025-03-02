import React, { FormEvent } from 'react';
import styles from './buttonSearch.module.scss';

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

  return (
    <>
      <header className={styles.header}>
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
          <button type="submit" className={styles.btn}>
            Search
          </button>
        </form>
      </div>
    </>
  );
};

export default ButtonSearch;
