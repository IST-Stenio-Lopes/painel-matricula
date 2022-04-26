import { BitField } from 'easy-bits';
import React, {
  createContext, useContext, useMemo, useCallback,
} from 'react';

import { UserRoles } from '../interfaces/IUser';

interface RolesContextData {
  updateUserRoles: (role: number) => void;
  getRole: (expected_Access: UserRoles) => void;
  getAnyRole: (expected_Access: UserRoles) => void;
}

const RolesContext = createContext<RolesContextData>({} as RolesContextData);

let roleBitField = new BitField<UserRoles>();
const RolesProvider: React.FC = ({ children }) => {
  // const roleBitField = useMemo(() => new BitField<UserRoles>(), []);

  const updateUserRoles = useCallback((role: number) => {
    roleBitField = new BitField<UserRoles>();
    roleBitField.on(role);
  }, []);

  const getRole = useCallback(
    (expected_Access: UserRoles) => roleBitField.test(expected_Access),
    [],
  );

  const getAnyRole = useCallback(
    (expected_Access: UserRoles) => roleBitField.testAny(expected_Access),
    [],
  );

  const dataValue = useMemo(() => ({
    updateUserRoles,
    getRole,
    getAnyRole,
  }), [getAnyRole, getRole, updateUserRoles]);

  return (
    <RolesContext.Provider value={dataValue}>
      {children}
    </RolesContext.Provider>
  );
};

// função para retornar o contexto de autenticação da aplicação
function useRoles(): RolesContextData {
  // atribui o contexto ao hook
  const context = useContext(RolesContext);

  // se não existir retorna um erro
  if (!context) {
    throw new Error('useRoles must be used within an RolesProvider');
  }

  // retorna o contexto
  return context;
}

export { RolesProvider, useRoles };
