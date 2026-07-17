import React, { useContext } from 'react';
import { ThemeContext } from '../themeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="btn btn-ghost"
      style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ThemeToggle;
