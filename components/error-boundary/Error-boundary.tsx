import { Component, ErrorInfo, ReactNode } from 'react';
import './error-boundary.scss';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };

    this.handleSimulateError = this.handleSimulateError.bind(this);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  handleSimulateError() {
    this.setState({
      hasError: true,
      error: new Error('This is a simulated error'),
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container error-container">
          <h1>Oops! Something went wrong.</h1>
          <p>{this.state.error?.message}</p>
          <button
            className="btn error-button"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return <div>{this.props.children}</div>;
  }
}

export default ErrorBoundary;
