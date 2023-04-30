import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { Container, ThemeProvider, createTheme } from '@mui/material';
import App from './App';
import { green } from '@mui/material/colors';

const container = document.getElementById('root')!;
const root = createRoot(container);
const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          <App />
        </ Container>
      </ ThemeProvider>
    </Provider>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
