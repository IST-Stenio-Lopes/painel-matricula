import React, {
  createContext, useContext, useState, useMemo,
} from 'react';
import { ISchoolSocketData } from '../interfaces/ISocket';

interface DashboardDataContextData {
  currentDashboardData: ISchoolSocketData | undefined;
  setCurrentDashboardData: (value: ISchoolSocketData | undefined) => void;
  enrollmentsHeld: number;
  enrollmentsReserved: number;
  messages: number;
}

const DashboardDataContext = createContext<DashboardDataContextData>(
  {} as DashboardDataContextData,
);

const DashboardDataProvider: React.FC = ({ children }) => {
  const [currentDashboardData, setCurrentDashboardData] = useState<ISchoolSocketData>();

  const enrollmentsHeld = useMemo(
    () => currentDashboardData?.enrollments_held || 0,
    [currentDashboardData?.enrollments_held],
  );
  const enrollmentsReserved = useMemo(
    () => currentDashboardData?.enrollments_reserved || 0,
    [currentDashboardData?.enrollments_reserved],
  );
  const messages = useMemo(
    () => currentDashboardData?.messages || 0,
    [currentDashboardData?.messages],
  );

  const dataValue = useMemo(() => ({
    currentDashboardData,
    setCurrentDashboardData,
    enrollmentsHeld,
    enrollmentsReserved,
    messages,
  }), [currentDashboardData, enrollmentsHeld, enrollmentsReserved, messages]);

  return (
    <DashboardDataContext.Provider value={dataValue}>
      {children}
    </DashboardDataContext.Provider>
  );
};

// função para retornar o contexto de autenticação da aplicação
function useDashboardData(): DashboardDataContextData {
  // atribui o contexto ao hook
  const context = useContext(DashboardDataContext);

  // se não existir retorna um erro
  if (!context) {
    throw new Error('useDashboardData must be used within an DashboardDataProvider');
  }

  // retorna o contexto
  return context;
}

export { DashboardDataProvider, useDashboardData };
