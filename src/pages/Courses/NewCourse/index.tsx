import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuTab from '../../../components/MenuTab';
import FormCourse from './components/FormCourse';

const NewCourse: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('Criar Curso');
  const location: any = useLocation();

  useEffect(() => {
    if (location.state?.course) {
      setCurrentTab('Editar Curso');
    }
  }, []);

  return (
    <MenuTab
      tabNames={[currentTab]}
      tabScreens={[<FormCourse />]}
    />
  );
};

export default NewCourse;
