import React from 'react';
import { useTheme } from './ThemeProvider';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '10px 20px',
        backgroundColor: 'var(--accent-color)',
        color: 'var(--text-color)',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </button>
  );
};

export default ThemeSwitcher;
