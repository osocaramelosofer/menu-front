'use client';
import { NextUIProvider } from '@nextui-org/react';
import { type ReactNode } from 'react';
import ThemeContextProvider from './context/theme-context';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeContextProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </ThemeContextProvider>
  );
}
