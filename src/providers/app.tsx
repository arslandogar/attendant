import { Button } from 'antd';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from '@/store';
import '@/App.scss';

const ErrorFallback = () => {
  return (
    <div className="full-page-container error-boundry" role="alert">
      <h2>Ooops, something went wrong :( </h2>
      <Button onClick={() => window.location.assign(window.location.origin)}>Refresh</Button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    </ErrorBoundary>
  );
};
