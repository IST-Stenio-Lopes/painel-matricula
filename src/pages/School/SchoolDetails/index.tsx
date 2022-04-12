import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuTab from '../../../components/MenuTab';
import FormSchool from './FormSchool';
import SchoolEmails from './SchoolEmails';

const SchoolDetails: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('Nova Unidade');
  const location: any = useLocation();

  useEffect(() => {
    if (location.state?.school) {
      setCurrentTab('Editar Unidade');
    }
  }, []);

  return (
    <MenuTab
      tabNames={[currentTab, 'Emails Automáticos']}
      tabScreens={[
        <FormSchool />,
        <SchoolEmails />,
      ]}
    />
  );
};

export default SchoolDetails;
