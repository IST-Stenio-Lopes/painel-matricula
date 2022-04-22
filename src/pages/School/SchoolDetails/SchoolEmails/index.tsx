import React, { useState } from 'react';
import MenuSelect from '../../../../components/MenuSelect';
import SelectMenuButton from '../../../../components/MenuSelect/components/SelectMenuButton';
import EmailPanel from './components/EmailPanel';
import Instructions from './components/Instructions';

import { Container, Content } from './styles';

const buttonsMenu = [
  'Editar Email - Pré Matrícula',
  'Editar Email -  Matrícula',
  'Editar Email - Lean Office',
];

const SchoolEmails: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState(buttonsMenu[0]);

  return (
    <Container>
      <Content>
        <MenuSelect>
          {buttonsMenu.map((name) => (
            <SelectMenuButton
              key={name}
              name={name}
              selectedMenu={selectedMenu}
              handleSelect={setSelectedMenu}
            />
          ))}
        </MenuSelect>
        <Instructions />
      </Content>
      <EmailPanel />
    </Container>
  );
};

export default SchoolEmails;
