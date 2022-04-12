import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuTab from '../../../components/MenuTab';
import NewClassRoom from './NewClassroom';
import ClassroomDetails from './ClassroomDetails';

const Classrooms: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('Nova Turma');
  const location: any = useLocation();

  useEffect(() => {
    if (location.state?.classroom) {
      setCurrentTab('Editar Turma');
    }
  }, []);

  return (
    <MenuTab
      disableButtons={currentTab === 'Nova Turma'}
      tabNames={[currentTab, 'Detalhes da Turma', 'Lista de Espera', 'Expirados']}
      tabScreens={[
        <NewClassRoom />,
        <ClassroomDetails />,
        <ClassroomDetails />,
        <ClassroomDetails />,
      ]}
    />
  );
};

export default Classrooms;
