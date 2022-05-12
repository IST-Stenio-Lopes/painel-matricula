import React, { useCallback, useEffect } from 'react';
import MenuTab from '../../../components/MenuTab';
import { useAuth } from '../../../hooks/auth';
import { useSchool } from '../../../hooks/school';
import api from '../../../services/api';
import EnrollmentSettings from './EnrollmentSettings';
import SchoolEmails from './SchoolEmails';

const SettingsDetails: React.FC = () => {
  const { currentSchool, setCurrentSchool } = useSchool();
  const { user } = useAuth();

  const getCurrentSchool = useCallback(async (schoolId) => {
    await api.get(`/school/dashboard/specific/${schoolId}`).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        setCurrentSchool(response.data);
      } else {
        setCurrentSchool(undefined);
      }
    });
  }, [setCurrentSchool]);

  useEffect(() => {
    console.log(currentSchool);
    getCurrentSchool(user.school_id);
  }, [user, getCurrentSchool]);

  return (
    <MenuTab
      tabNames={['Configuração de Matrícula', 'Emails Automáticos']}
      tabScreens={[
        <EnrollmentSettings />,
        <SchoolEmails />,
      ]}
    />
  );
};

export default SettingsDetails;
