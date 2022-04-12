import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuTab from '../../../components/MenuTab';
import FormAdvertising from './FormAdvertising';

const AdvertisingDetails: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('Criar Anúncio');
  const location: any = useLocation();

  useEffect(() => {
    if (location.state?.advertising) {
      setCurrentTab('Editar Anúncio');
    }
  }, []);

  return (
    <MenuTab
      tabNames={[currentTab]}
      tabScreens={[
        <FormAdvertising />,
      ]}
    />
  );
};

export default AdvertisingDetails;
