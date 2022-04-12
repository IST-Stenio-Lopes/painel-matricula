import React from 'react';
import MenuTab from '../../../components/MenuTab';
import FormUser from './components/FormUser';

const NewUser: React.FC = () => (
  <MenuTab
    tabNames={['Editar Usuário']}
    tabScreens={[<FormUser />]}
  />
);

export default NewUser;
