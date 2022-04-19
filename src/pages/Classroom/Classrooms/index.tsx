import React, { useCallback, useEffect, useState } from 'react';
import MenuTab from '../../../components/MenuTab';
import NewClassRoom from './NewClassroom';
import ClassroomDetails from './ClassroomDetails';
import { useClassroom } from '../../../hooks/classroom';
import api from '../../../services/api';
import { IClassroomDetails } from '../../../interfaces/IClassroom';
import ClassroomWaitList from './ClassroomWaitList';
import ClassroomExpired from './ClassroomExpired';

const Classrooms: React.FC = () => {
  const { currentClassroom, setCurrentClassroom } = useClassroom();
  const [currentTab, setCurrentTab] = useState('Nova Turma');

  const getClassroom = useCallback(async () => {
    await api.get(`/classroom/dashboard/specific/${currentClassroom?.classroom.object_id}`).catch((err) => {

    }).then((response) => {
      if (response?.status && response.status >= 200 && response.status <= 299) {
        const classroomResponse: IClassroomDetails = response.data;
        console.dir(classroomResponse);
        setCurrentClassroom(classroomResponse);
      }
    });
  }, [currentClassroom, setCurrentClassroom]);

  useEffect(() => {
    if (currentClassroom?.classroom?.object_id) {
      setCurrentTab('Editar Turma');
      getClassroom();
    }
  }, [currentClassroom, getClassroom]);

  return (
    <MenuTab
      disableButtons={currentTab === 'Nova Turma'}
      tabNames={[currentTab, 'Detalhes da Turma', 'Lista de Espera', 'Expirados']}
      tabScreens={[
        <NewClassRoom />,
        <ClassroomDetails />,
        <ClassroomWaitList />,
        <ClassroomExpired />,
      ]}
    />
  );
};

export default Classrooms;
