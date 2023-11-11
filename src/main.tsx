import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import GlobalStyles from './components/GlobalStyles';
import { Provider } from 'react-redux';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import { store } from './store';
import { Draw } from './routes/draw';
import { Home } from './routes/home';
import { Participants } from './routes/participants';
import { Exclusions } from './routes/exclusions';
import { Draws } from './routes/draws';
import { Layout } from './components/Layout';
import { RemoteReveal } from './routes/remote-reveal';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: 'entry/participants',
          element: <Participants />,
        },
        {
          path: 'entry/exclusions',
          element: <Exclusions />,
        },
        {
          path: 'draws',
          element: <Draws />,
        },
        {
          path: 'draw/:id',
          loader: ({ params: { id } }) => {
            const draw = store.getState().draws.draws.find((draw) => draw.id === id);
            return draw ?? redirect('/');
          },
          element: <Draw />,
        },
        {
          path: 'reveal/:wrapped',
          element: <RemoteReveal />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
