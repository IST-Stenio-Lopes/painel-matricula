import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuTab from '../../../components/MenuTab';
import FormFaq from './components/FormFaq';

const NewFaq: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('Criar Tópico');
  const location: any = useLocation();

  useEffect(() => {
    if (location.state?.faq) {
      setCurrentTab('Editar Tópico');
    }
  }, []);

  return (
    <MenuTab
      tabNames={[currentTab]}
      tabScreens={[<FormFaq />]}
    />
  );
};

export default NewFaq;
