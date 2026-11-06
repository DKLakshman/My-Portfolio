import { useEffect, useState } from 'react';

const read = () => {
  try { return localStorage.getItem('theme'); } catch { return null; }
};

export function useTheme() {
  const [theme, setTheme] = useState(() => read() ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch { /* storage unavailable */ }
  }, [theme]);

  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))];
}
