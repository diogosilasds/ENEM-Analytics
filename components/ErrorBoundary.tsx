import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
          <div className="bg-brand-card border border-brand-border p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold text-brand-accent mb-4">Something went wrong</h2>
            <p className="text-brand-muted mb-4">
              An error occurred in the application. Please try refreshing the page.
            </p>
            <div className="bg-black/50 p-4 rounded text-xs font-mono text-brand-text overflow-auto max-h-48">
              {this.state.error?.message}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 w-full bg-brand-accent text-black font-bold py-2 px-4 rounded hover:bg-brand-accent/90 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
