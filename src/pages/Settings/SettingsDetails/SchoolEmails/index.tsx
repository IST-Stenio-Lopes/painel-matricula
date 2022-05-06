import React, { useMemo, useState } from 'react';
import MenuSelect from '../../../../components/MenuSelect';
import SelectMenuButton from '../../../../components/MenuSelect/components/SelectMenuButton';
import { useSchool } from '../../../../hooks/school';
import { EmailTypes } from '../../../../interfaces/ISchool';
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
  const { currentSchool } = useSchool();

  const instructionsType = useMemo(() => {
    switch (selectedMenu) {
      case 'Editar Email - Pré Matrícula':
        return 'Reserva';
      case 'Editar Email - Matrícula':
        return 'Matricula';
      default:
        return 'Lean';
    }
  }, [selectedMenu]);

  const selectedEmailType = useMemo(() => {
    switch (instructionsType) {
      case 'Reserva':
        return EmailTypes.Reservado;
      case 'Matricula':
        return EmailTypes.Matricula;
      default:
        return EmailTypes.Lean;
    }
  }, [instructionsType]);

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
        <Instructions instructionType={instructionsType} />

      </Content>
      <EmailPanel selectedEmailType={selectedEmailType} />
    </Container>
  );
};

export default SchoolEmails;
