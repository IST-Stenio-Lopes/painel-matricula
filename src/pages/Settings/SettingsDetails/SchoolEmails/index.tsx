import React, { useMemo, useState } from 'react';
import MenuSelect from '../../../../components/MenuSelect';
import SelectMenuButton from '../../../../components/MenuSelect/components/SelectMenuButton';
import { useSchool } from '../../../../hooks/school';
import { EmailTypes, IEmailType } from '../../../../interfaces/ISchool';
import EmailPanel from './components/EmailPanel';
import Instructions from './components/Instructions';

import { Container, Content } from './styles';

const buttonsMenu = [
  'Editar Email - Pré Matrícula',
  'Editar Email -  Matrícula',
  'Editar Email - Lean Office',
];

const neededKeysToReserved = [
  'Nome do Aluno',
  'Curso',
  'Turno',
  'Unidade',
  'Email',
  'Dias',
];

const neededKeys = [
  'Nome do Aluno',
  'Curso',
  'Turno',
  'Unidade',
  'Email',
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

  const keys = useMemo(() => {
    switch (instructionsType) {
      case 'Reserva':
        return neededKeysToReserved;
      case 'Matricula':
        return neededKeys;
      default:
        return neededKeys;
    }
  }, [instructionsType]);

  const initialEmailValue = useMemo(() => {
    switch (instructionsType) {
      case 'Reserva':
        return currentSchool?.pre_registration_email;
      case 'Matricula':
        return currentSchool?.application_email;
      default:
        return currentSchool?.lean_office_email;
    }
  }, [instructionsType, currentSchool]);

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
      <EmailPanel
        initialValue={initialEmailValue as IEmailType}
        selectedEmailType={selectedEmailType}
        neededKeys={keys}
      />
    </Container>
  );
};

export default SchoolEmails;
