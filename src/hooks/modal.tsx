import React, {
  createContext, useContext, useCallback, useState, useMemo,
} from 'react';
import Modal from '../components/Modal';

interface ModalContextData {
  handleVisible(): void;
  handleDismiss(): void;
  configModal: (
    bodyDescription: string,
    iconType?: 'delete' | 'save' | 'logout' | 'message' | 'status' | 'success' | 'error',
    footerHasQuestion?: boolean,
    footerHasCountdown?: boolean,
    handleConfirmButton?: () => void,
    handleCancelButton?: () => void,
    ) => void;
}
const ModalContext = createContext<ModalContextData>({} as ModalContextData);

const initialValue = {
  msg: 'Você tem certeza que deseja excluir cliente? Sua ação não poderá ser desfeita.',
  iconType: 'error',
  hasQuestion: false,
  hasCountdown: false,
  confirm: () => {},
  cancel: () => {},
};

const ModalProvider: React.FC = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(initialValue);

  const configModal = useCallback((
    bodyDescription: string,
    iconType = 'error',
    footerHasQuestion = false,
    footerHasCountdown = false,
    handleConfirmButton = () => {},
    handleCancelButton = () => {},
  ) => {
    setData({
      msg: bodyDescription,
      iconType,
      hasQuestion: footerHasQuestion,
      hasCountdown: footerHasCountdown,
      confirm: handleConfirmButton,
      cancel: handleCancelButton,
    });
  }, []);

  const handleVisible = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
  }, []);

  const handleYes = useCallback(() => {
    setVisible(false);
    data.confirm();
  }, [setVisible, data]);

  const handleNo = useCallback(() => {
    setVisible(false);
    data.cancel();
  }, [setVisible, data]);

  const dataValue = useMemo(() => ({
    handleVisible,
    handleDismiss,
    configModal,
  }), [handleVisible,
    handleDismiss,
    configModal]);

  return (
    <ModalContext.Provider value={dataValue}>
      {visible && (
      <Modal
        handleDismiss={handleDismiss}
        handleYes={handleYes}
        handleNo={handleNo}
        description={data.msg}
        hasQuestion={data.hasQuestion}
        hasCountdown={data.hasCountdown}
        iconType={data.iconType}
      />
      )}
      {children}
    </ModalContext.Provider>
  );
};

// função para retornar o contexto de autenticação da aplicação
function useModal(): ModalContextData {
  // atribui o contexto ao hook
  const context = useContext(ModalContext);

  // se não existir retorna um erro
  if (!context) {
    throw new Error('useModal must be used within an ModalProvider');
  }

  // retorna o contexto
  return context;
}

export { ModalProvider, useModal };
