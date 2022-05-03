import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuTab from '../../../components/MenuTab';
import { useSchool } from '../../../hooks/school';
import api from '../../../services/api';
import FormSchool from './FormSchool';

const SchoolDetails: React.FC = () => {
  const { setCurrentSchool } = useSchool();
  const [currentTab, setCurrentTab] = useState('Nova Unidade');
  const location: any = useLocation();

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
    if (location.state?.school) {
      getCurrentSchool(location.state?.school.object_id);
      setCurrentTab('Editar Unidade');
    }
  }, [getCurrentSchool, location.state?.school]);

  return (
    <MenuTab
      tabNames={[currentTab]}
      tabScreens={[
        <FormSchool />,
      ]}
    />
  );
};

export default SchoolDetails;
