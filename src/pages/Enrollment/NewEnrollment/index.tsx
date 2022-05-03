import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuTab from '../../../components/MenuTab';
import FormEnrollment from './FormEnrollment';

const EnrollmentDetails: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('Nova Matrícula');
  const location: any = useLocation();

  useEffect(() => {
    if (location.state?.enrollment) {
      setCurrentTab('Editar Matrícula');
    }
  }, [location.state?.enrollment]);

  return (
    <MenuTab
      tabNames={[currentTab]}
      tabScreens={[
        <FormEnrollment />,
      ]}
    />
  );
};

export default EnrollmentDetails;
