import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import './index.scss';
import ErrorBoundary from './components/error/error';

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
      <ErrorBoundary>
        <StrictMode>
          <App />
        </StrictMode>
      </ErrorBoundary>
    );
  }
}

export default new CreateRoot();
