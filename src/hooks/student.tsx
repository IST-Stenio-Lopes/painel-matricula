import React, {
  createContext, useContext, useState, useMemo,
} from 'react';

import { IStudent } from '../pages/Enrollment/NewEnrollment/FormEnrollment/data/types';

interface StudentContextData {
  currentStudent: IStudent | undefined;
  setCurrentStudent: (value: IStudent | undefined) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const StudentContext = createContext<StudentContextData>({} as StudentContextData);

const StudentProvider: React.FC = ({ children }) => {
  const [currentStudent, setCurrentStudent] = useState<IStudent>();
  const [isEditing, setIsEditing] = useState(false);

  const dataValue = useMemo(() => ({
    currentStudent,
    setCurrentStudent,
    isEditing,
    setIsEditing,
  }), [currentStudent, isEditing]);

  return (
    <StudentContext.Provider value={dataValue}>
      {children}
    </StudentContext.Provider>
  );
};

// função para retornar o contexto de autenticação da aplicação
function useStudent(): StudentContextData {
  // atribui o contexto ao hook
  const context = useContext(StudentContext);

  // se não existir retorna um erro
  if (!context) {
    throw new Error('useStudent must be used within an StudentProvider');
  }

  // retorna o contexto
  return context;
}

export { StudentProvider, useStudent };
