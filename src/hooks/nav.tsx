import { AxiosResponse } from 'axios';
import React, {
  useState, createContext, useCallback, useContext, useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { service } from '../services/api';
import { useAuth } from './auth';
import { useModal } from './modal';

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
  const { configModal, handleVisible } = useModal();
  const { signOut } = useAuth();

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
  }, [history]);

  service.register({
    onResponse(response: AxiosResponse) {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        setEditing(false);
      } else if (response?.status && response.status === 426) {
        configModal('Sessão expirada, por favor inicie um anova sessão', 'error');
        handleVisible();
        signOut();
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
