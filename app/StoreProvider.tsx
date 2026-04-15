'use client';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
import { ThemeProvider } from 'next-themes';

export default function StoreProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </Provider>
  );
}
