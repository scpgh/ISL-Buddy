// Theme Utility for Managing Light & Dark Mode (Duolingo Spec)

const THEME_KEY = 'duo_theme_preference';

export const getTheme = () => {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) return saved;
  return 'dark'; // Default to dark theme for high contrast
};

export const applyTheme = (theme) => {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  localStorage.setItem(THEME_KEY, theme);
};

export const toggleTheme = () => {
  const current = getTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
};
