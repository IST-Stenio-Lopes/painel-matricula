import React, { useEffect, useState } from 'react';
import MenuTab from '../../../components/MenuTab';
import NewClassRoom from './NewClassroom';
import ClassroomDetails from './ClassroomDetails';
import { useClassroom } from '../../../hooks/classroom';

const Classrooms: React.FC = () => {
  const { currentClassroom } = useClassroom();
  const [currentTab, setCurrentTab] = useState('Nova Turma');

  useEffect(() => {
    if (currentClassroom) {
      setCurrentTab('Editar Turma');
    }
  }, [currentClassroom]);

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
