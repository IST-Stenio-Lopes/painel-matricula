import React from 'react';
import Home from './components/home';
import Login from './components/login';
import TesteFunctions from './components/teste';
import Routees from './routes/routes';
import { AuthProvider } from './context/AuthContext';

//<TesteFunctions />
function App() {
    return (
        <AuthProvider>
            <Routees />
        </AuthProvider>

    );
}

export default App;
