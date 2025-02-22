import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import './index.scss';
import ErrorBoundary from './components/error-boundary/Error-boundary';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from './components/theme-context/ThemeProvider';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <ThemeProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ThemeProvider>
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  console.error('Element #root not found');
}
