import { AxiosResponse } from 'axios';
import React, {
  useState, createContext, useCallback, useContext, useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { service } from '../services/api';

interface NavContextData {
  hasBackButton: boolean;
  showBackButton(): void;
  hideBackButton(): void;
  handleBackButton(): void;
  isEditing: boolean;
  setEditing(show: boolean): void;
}
const NavContext = createContext<NavContextData>({} as NavContextData);

const NavProvider: React.FC = ({ children }) => {
  const [hasBackButton, setHasBackButton] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const history = useNavigate();

  const setEditing = useCallback((show) => {
    setIsEditing(show);
  }, []);
  const showBackButton = useCallback(() => {
    setHasBackButton(true);
  }, []);

  const hideBackButton = useCallback(() => {
    setHasBackButton(false);
    hideBackButton;
  }, []);

  const handleBackButton = useCallback(() => {
    history(-1);
    // hideBackButton();
  }, [history, hideBackButton]);

  service.register({
    onResponse(response: AxiosResponse) {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        setEditing(false);
      }
      return response;
    },
  });

  const dataValue = useMemo(() => ({
    hasBackButton,
    showBackButton,
    handleBackButton,
    hideBackButton,
    isEditing,
    setEditing,
  }), [hasBackButton,
    showBackButton,
    handleBackButton,
    hideBackButton,
    isEditing,
    setEditing]);

  return (
    <NavContext.Provider value={dataValue}>
      {children}
    </NavContext.Provider>
  );
};

// função para retornar o contexto de autenticação da aplicação
function useNav(): NavContextData {
  // atribui o contexto ao hook
  const context = useContext(NavContext);

  // se não existir retorna um erro
  if (!context) {
    throw new Error('useNav must be used within an NavProvider');
  }

  // retorna o contexto
  return context;
}

export { NavProvider, useNav };
