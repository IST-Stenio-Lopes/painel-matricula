import React from 'react';
import MenuTab from '../../../components/MenuTab';
import Enrollments from './Enrollments';
import Reservations from './Reservations';
import Others from './Others';
import { useDashboardData } from '../../../hooks/dashboardData';

const EnrollmentsList: React.FC = () => {
  const { currentDashboardData } = useDashboardData();
  return (
    <MenuTab
      tabNames={['Matriculas', 'Reservadas', 'Outras']}
      tabNotifications={[currentDashboardData?.enrollments_held || 0,
        currentDashboardData?.enrollments_reserved || 0, 0]}
      tabScreens={[
        <Enrollments />,
        <Reservations />,
        <Others />,
      ]}
    />
  );
};

export default EnrollmentsList;
