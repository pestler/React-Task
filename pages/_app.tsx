import { AppProps } from 'next/app';
import '../styles/globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export default MyApp;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <header>
          <h1>Star Wars App</h1>
        </header>
        <main>
          <Component {...pageProps} />
        </main>
        <footer>
          <p>© 2025 Star Wars Fan App</p>
        </footer>
      </ThemeProvider>
    </>
  );
}
