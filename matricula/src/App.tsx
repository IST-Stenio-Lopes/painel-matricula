import React from 'react';

import AppProvider from './components/contexts';
import Home from './components/home';
import Login from './components/login';
import TesteFunctions from './components/teste';
import { AuthProvider } from './context/AuthContext';
import Routees from './routes/routes';

//<TesteFunctions />
function App() {
    return (
        <AppProvider>
            <Routees />
        </AppProvider>

    );
}

export default App;
