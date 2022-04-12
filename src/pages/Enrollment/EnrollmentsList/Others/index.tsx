import React from 'react';
import { HiPlus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/Forms/Buttons/Button';
import ListTable from '../../../../components/ListTable';
import ListSearchArea from '../../../../components/ListTable/components/ListSearchArea';

import { Container } from './styles';

const listTitles = [
  {
    id: '4',
    name: 'Nome',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 20%)',
  },
  {
    id: '1',
    name: 'CPF',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 10%)',
  },
  {
    id: '2',
    name: 'Curso',
    hasSorting: true,
    hasFilter: true,
    growFactor: 'minmax(150px, 20%)',
    filterOptions: [
      { value: 'Atendente', label: 'Atendente' },
      { value: 'Coordenador', label: 'Coordenador' },
      { value: 'Diretor', label: 'Diretor' },
      { value: 'Tesoureiro', label: 'Tesoureiro' },
      { value: 'Visitante', label: 'Visitante' },
    ],
  },
  {
    id: '3',
    name: 'Telefone',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 15%)',
  },
  {
    id: '5',
    name: 'Email',
    hasSorting: true,
    hasFilter: false,
    growFactor: 'minmax(150px, 15%)',
  },
];

const listItems = [
  {
    name: 'Pedro Henrique Barbosa',
    cpf: '751.259.380-50',
    curso: 'Jogos Digitais',
    telefone: '(83) 98254-3692',
    email: 'pedrohen12@gmail.com',
  },
  {
    name: 'Pedro Henrique Barbosa',
    cpf: '751.259.380-50',
    curso: 'Jogos Digitais',
    telefone: '(83) 98254-3692',
    email: 'pedrohen12@gmail.com',

  },
  {
    name: 'Pedro Henrique Barbosa',
    cpf: '751.259.380-50',
    curso: 'Jogos Digitais',
    telefone: '(83) 98254-3692',
    email: 'pedrohen12@gmail.com',

  },
  {
    name: 'Pedro Henrique Barbosa',
    cpf: '751.259.380-50',
    curso: 'Jogos Digitais',
    telefone: '(83) 98254-3692',
    email: 'pedrohen12@gmail.com',
  },
  {
    name: 'Pedro Henrique Barbosa',
    cpf: '751.259.380-50',
    curso: 'Jogos Digitais',
    telefone: '(83) 98254-3692',
    email: 'pedrohen12@gmail.com',
  },
  {
    name: 'Pedro Henrique Barbosa',
    cpf: '751.259.380-50',
    curso: 'Jogos Digitais',
    telefone: '(83) 98254-3692',
    email: 'pedrohen12@gmail.com',

  },
];

const Others: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <ListSearchArea listFilters={listTitles}>
        <Button
          onClick={() => navigate('detalhes')}
          maxWidth="200px"
          maxHeight="100%"
          leftIcon={<HiPlus size={18} />}
        >
          NOVA MATRICULA
        </Button>
      </ListSearchArea>
      <ListTable
        indexToBold={0}
        listTitles={listTitles}
        listItems={listItems}
        itemsPerPages={10}
        currentPage={1}
        totalOfItems={100}
        gridRow="2 / 2"
        hasTrashButton
      />
    </Container>
  );
};

export default Others;
