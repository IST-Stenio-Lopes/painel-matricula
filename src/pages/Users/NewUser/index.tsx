import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuTab from '../../../components/MenuTab';
import FormUser from './components/FormUser';

const NewUser: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('Criar Usuário');
  const location: any = useLocation();

  useEffect(() => {
    if (location.state?.user) {
      setCurrentTab('Editar Usuário');
    }
  }, []);

  return (
    <MenuTab
      tabNames={[currentTab]}
      tabScreens={[<FormUser />]}
    />
  );
};

export default NewUser;
