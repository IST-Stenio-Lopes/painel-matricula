import React, {
  createContext, useContext, useState, useMemo, useCallback,
} from 'react';
import { ISchool } from '../interfaces/ISchool';
import api from '../services/api';

interface SchoolContextData {
  currentSchool: ISchool | undefined;
  setCurrentSchool: (value: ISchool | undefined) => void;
  getCurrentSchool: () => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const SchoolContext = createContext<SchoolContextData>({} as SchoolContextData);

const SchoolProvider: React.FC = ({ children }) => {
  const [currentSchool, setCurrentSchool] = useState<ISchool>();
  const [isEditing, setIsEditing] = useState(false);

  const updateSchool = useCallback((school) => {
    const applicationEmail = {
      ...school.application_email,
      header: school.application_email.header.join('\n'),
      body: school.application_email.body.join('\n'),
    };

    const reservedEmail = {
      ...school.pre_registration_email,
      header: school.pre_registration_email.header.join('\n'),
      body: school.pre_registration_email.body.join('\n'),
    };

    const leanEmail = {
      ...school.lean_office_email,
      header: school.lean_office_email.header.join('\n'),
      body: school.lean_office_email.body.join('\n'),
    };

    const temp: ISchool = {
      ...school,
      application_email: applicationEmail,
      pre_registration_email: reservedEmail,
      lean_office_email: leanEmail,
    };

    setCurrentSchool(temp);
  }, []);

  const getCurrentSchool = useCallback(async () => {
    await api.get(`/school/dashboard/specific/${currentSchool?.id}`).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        setCurrentSchool(response.data);
      }
    });
  }, [currentSchool, setCurrentSchool]);

  const dataValue = useMemo(() => ({
    currentSchool,
    setCurrentSchool: updateSchool,
    getCurrentSchool,
    isEditing,
    setIsEditing,
  }), [currentSchool, isEditing, updateSchool, getCurrentSchool]);

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
