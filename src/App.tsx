import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './global/styles/global';
import Routes from './routes';

import AppProvider from './hooks';
import { theme } from './global/styles/styles';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <GlobalStyle />
      <AppProvider>
        <Routes />
      </AppProvider>
    </Router>
  </ThemeProvider>
);

export default App;
