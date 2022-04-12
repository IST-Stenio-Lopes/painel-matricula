import React, {
  createContext, useContext, useState, useMemo,
} from 'react';

import { IEnrollment } from '../pages/Enrollment/NewEnrollment/FormEnrollment/data/types';

interface EnrollmentContextData {
  currentEnrollment: IEnrollment | undefined;
  setCurrentEnrollment: (value: IEnrollment | undefined) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const EnrollmentContext = createContext<EnrollmentContextData>({} as EnrollmentContextData);

const EnrollmentProvider: React.FC = ({ children }) => {
  const [currentEnrollment, setCurrentEnrollment] = useState<IEnrollment>();
  const [isEditing, setIsEditing] = useState(false);

  const dataValue = useMemo(() => ({
    currentEnrollment,
    setCurrentEnrollment,
    isEditing,
    setIsEditing,
  }), [currentEnrollment, isEditing]);

  return (
    <EnrollmentContext.Provider value={dataValue}>
      {children}
    </EnrollmentContext.Provider>
  );
};

// função para retornar o contexto de autenticação da aplicação
function useEnrollment(): EnrollmentContextData {
  // atribui o contexto ao hook
  const context = useContext(EnrollmentContext);

  // se não existir retorna um erro
  if (!context) {
    throw new Error('useEnrollment must be used within an EnrollmentProvider');
  }

  // retorna o contexto
  return context;
}

export { EnrollmentProvider, useEnrollment };
