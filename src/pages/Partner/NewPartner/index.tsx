import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuTab from '../../../components/MenuTab';
import FormPartner from './components/FormPartner';

const NewFaq: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('Novo Parceiro');
  const location: any = useLocation();

  useEffect(() => {
    if (location.state?.partner) {
      setCurrentTab('Editar Parceiro');
    }
  }, []);

  return (
    <MenuTab
      tabNames={[currentTab]}
      tabScreens={[<FormPartner />]}
    />
  );
};

export default NewFaq;
