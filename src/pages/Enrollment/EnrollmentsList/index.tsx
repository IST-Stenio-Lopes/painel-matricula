import React from 'react';
import MenuTab from '../../../components/MenuTab';
import Enrollments from './Enrollments';
import Reservations from './Reservations';
import Others from './Others';

const EnrollmentsList: React.FC = () => (
  <MenuTab
    tabNames={['Matriculas', 'Reservadas', 'Outras']}
    tabScreens={[
      <Enrollments />,
      <Reservations />,
      <Others />,
    ]}
  />
);

export default EnrollmentsList;
