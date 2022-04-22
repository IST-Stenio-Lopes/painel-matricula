import jwtDecode from 'jwt-decode';
import React, {
  createContext, useCallback, useState, useContext, useMemo,
} from 'react';
import { updateUserRoles } from '../interfaces/IUser';
import api from '../services/api';

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  role_name: string;
  role: number;
  company_id: string;
  school_id: string;
  school_city: string;
  school_estate: string;
  school_initials: string;
}

interface AuthState {
  token: string;
  user: IUser;
  refresh_token: string;
}

interface SignInCredentials {
  request_token: string;
  school_id: string;
}

interface AuthContextData {
  user: IUser;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: IUser): void;
}

interface DecodedProps {
  [key: string] : string | Number;
  exp: number;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Matricula:token');
    const user = localStorage.getItem('@Matricula:user');
    const refresh_token = localStorage.getItem('@Matricula:refresh_token');

    if (token && user && refresh_token) {
      const decoded: DecodedProps = jwtDecode(token);

      const expirationTime = (decoded.exp * 1000);

      if (Date.now() >= expirationTime) {
        return {} as AuthState;
      }

      api.defaults.headers.common.authorization = `Bearer ${token}`;

      const userObject: IUser = JSON.parse(user);
      updateUserRoles(userObject.role);
      return { token, user: userObject, refresh_token };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ request_token, school_id }) => {
    const response = await api.post('/dashboard/sessions', { request_token, school_id });

    const { token, refresh_token } = response.data;

    localStorage.setItem('@Matricula:token', token);
    localStorage.setItem('@Matricula:refresh_token', refresh_token);

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    const responseProfile = await api.get('/users/dashboard/profile');

    const profile = { ...responseProfile.data, school_id };

    localStorage.setItem('@Matricula:user', JSON.stringify(profile));

    setData({ token, user: profile, refresh_token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Matricula:token');
    localStorage.removeItem('@Matricula:user');
    localStorage.removeItem('@Matricula:refresh_token');

    setData({} as AuthState);
    console.log('aqui');
  }, []);

  const updateUser = useCallback(
    (user: IUser) => {
      localStorage.setItem('@Matricula:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
        refresh_token: data.refresh_token,
      });
    },
    [setData, data.token, data.refresh_token],
  );

  const value = useMemo(() => ({
    user: data.user, signIn, signOut, updateUser,
  }), [data, signIn, signOut, updateUser]);
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
