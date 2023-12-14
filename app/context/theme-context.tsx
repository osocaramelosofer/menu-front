'use client';

import React, { useEffect, useState, createContext, useContext } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<Theme>('light');

  // Esta función ahora no hace nada, pero se deja aquí por si quieres agregar algo en el futuro
  const toggleTheme = () => {};

  useEffect(() => {
    // Simplemente establece el tema en 'light' y asegúrate de que no se aplique la clase 'dark'
    setTheme('light');
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }

  return context;
}
