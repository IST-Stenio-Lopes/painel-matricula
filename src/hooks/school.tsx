import React, {
  createContext, useContext, useState, useMemo,
} from 'react';
import { ISchool } from '../interfaces/ISchool';

interface SchoolContextData {
  currentSchool: ISchool | undefined;
  setCurrentSchool: (value: ISchool | undefined) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const SchoolContext = createContext<SchoolContextData>({} as SchoolContextData);

const SchoolProvider: React.FC = ({ children }) => {
  const [currentSchool, setCurrentSchool] = useState<ISchool>();
  const [isEditing, setIsEditing] = useState(false);

  const dataValue = useMemo(() => ({
    currentSchool,
    setCurrentSchool,
    isEditing,
    setIsEditing,
  }), [currentSchool, isEditing]);

  return (
    <SchoolContext.Provider value={dataValue}>
      {children}
    </SchoolContext.Provider>
  );
};

// função para retornar o contexto de autenticação da aplicação
function useSchool(): SchoolContextData {
  // atribui o contexto ao hook
  const context = useContext(SchoolContext);

  // se não existir retorna um erro
  if (!context) {
    throw new Error('useSchool must be used within an SchoolProvider');
  }

  // retorna o contexto
  return context;
}

export { SchoolProvider, useSchool };
