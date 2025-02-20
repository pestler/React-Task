import React from 'react';
import { useTheme } from './theme-context';
import { darkTheme } from './themes';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="btn" onClick={toggleTheme}>
      {theme === darkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
