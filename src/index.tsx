import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import ErrorBoundary from './components/error-boundary/Error-boundary';
import App from './components/app';

class CreateRoot {
  private body: HTMLElement | null;
  private root!: ReactDOM.Root;

  constructor() {
    this.body = document.getElementById('root');
    if (this.body) {
      this.root = ReactDOM.createRoot(this.body);
      this.mount();
    } else {
      console.error('Element #root not found');
    }
  }

  private mount(): void {
    this.root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    );
  }
}

export default new CreateRoot();
