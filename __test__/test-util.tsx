import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { rootReducer } from '../src/redux/store';
import { ThemeProvider } from './components/theme-context/ThemeProvider';

export const renderWithStateMgmtAndRouter = (
  ui: React.ReactElement,
  {
    actions = [] as Array<{ type: string; payload?: unknown }>,
    route = '/',
  } = {}
) => {
  const store = configureStore({
    reducer: rootReducer,
  });

  actions.forEach((action) => store.dispatch(action));

  const history = createMemoryHistory({
    initialEntries: [route],
  });

  const renderResult = render(
    <ThemeProvider>
      <Router location={history.location} navigator={history}>
        <Provider store={store}>{ui}</Provider>
      </Router>
    </ThemeProvider>
  );

  return {
    ...renderResult,
    store,
    history,
  };
};
