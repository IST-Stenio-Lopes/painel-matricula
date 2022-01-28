import React, { createContext, useCallback, useContext } from "react";
import api from '../services/api';


interface SignInCredentials{
    email: string;
    password: string;
}

interface AuthContextData {
    name: string;
    signIn(credentials : SignInCredentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', {
            email,
            password,
        });
        console.log(response.data);
    }, []);

    return (
        <AuthContext.Provider value={{ name: 'Mysael', signIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextData{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}

