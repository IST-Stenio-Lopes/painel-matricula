import React from 'react';
import MenuTab from '../../../components/MenuTab';
import FormMessage from './FormMessage';

const MessageDetails: React.FC = () => (
  <MenuTab
    tabNames={['Detalhes da Mensagem']}
    tabScreens={[<FormMessage />]}
  />
);

export default MessageDetails;
