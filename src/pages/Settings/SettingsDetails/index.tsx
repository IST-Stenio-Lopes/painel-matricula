import React from 'react';
import MenuTab from '../../../components/MenuTab';
import EnrollmentSettings from './EnrollmentSettings';
import SchoolEmails from './SchoolEmails';

const SettingsDetails: React.FC = () => (
  <MenuTab
    tabNames={['Configuração de Matrícula', 'Emails Automáticos']}
    tabScreens={[
      <EnrollmentSettings />,
      <SchoolEmails />,
    ]}
  />
);

export default SettingsDetails;
