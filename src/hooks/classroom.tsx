import React, {
  createContext, useContext, useState, useMemo,
} from 'react';
import { IClassroom } from '../interfaces/IClassroom';

interface ClassroomContextData {
  currentClassroom: IClassroom | undefined;
  setCurrentClassroom: (value: IClassroom | undefined) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const ClassroomContext = createContext<ClassroomContextData>({} as ClassroomContextData);

const ClassroomProvider: React.FC = ({ children }) => {
  const [currentClassroom, setCurrentClassroom] = useState<IClassroom>();
  const [isEditing, setIsEditing] = useState(false);

  const dataValue = useMemo(() => ({
    currentClassroom,
    setCurrentClassroom,
    isEditing,
    setIsEditing,
  }), [currentClassroom, isEditing]);

  return (
    <ClassroomContext.Provider value={dataValue}>
      {children}
    </ClassroomContext.Provider>
  );
};

// função para retornar o contexto de autenticação da aplicação
function useClassroom(): ClassroomContextData {
  // atribui o contexto ao hook
  const context = useContext(ClassroomContext);

  // se não existir retorna um erro
  if (!context) {
    throw new Error('useClassroom must be used within an ClassroomProvider');
  }

  // retorna o contexto
  return context;
}

export { ClassroomProvider, useClassroom };
