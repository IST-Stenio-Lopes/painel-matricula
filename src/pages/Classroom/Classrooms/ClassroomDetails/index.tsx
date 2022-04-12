import React from 'react';
import ListTable from '../../../../components/ListTable';
import ClassroomInfo from '../../components/ClassroomInfo';

import { Container } from './styles';

const listTitles = [
  {
    id: '4',
    name: 'Curso',
    hasSorting: true,
    hasFilter: true,
    growFactor: '20%',
  },
  {
    id: '1',
    name: 'Área',
    hasSorting: true,
    hasFilter: true,
    growFactor: '20%',
  },
  {
    id: '2',
    name: 'Valor',
    hasSorting: true,
    hasFilter: true,
    growFactor: '10%',
  },
  {
    id: '3',
    name: 'Modalidade',
    hasSorting: true,
    hasFilter: true,
    growFactor: '15%',
  },
  {
    id: '5',
    name: 'Duração',
    hasSorting: true,
    hasFilter: true,
    growFactor: '15%',
  },
];

const listItems = [
  {
    curso: 'Jogos Digitais',
    area: 'Tecnologia da Informação',
    valor: 'R$320,00',
    turno: 'Tarde',
    modalidade: 'Presencial',
  },
  {
    curso: 'Jogos Digitais',
    area: 'Tecnologia da Informação',
    valor: 'R$320,00',
    turno: 'Tarde',
    modalidade: 'Presencial',

  },
  {
    curso: 'Jogos Digitais',
    area: 'Tecnologia da Informação',
    valor: 'R$320,00',
    turno: 'Manhã',
    modalidade: 'EAD',

  },
  {
    curso: 'Jogos Digitais',
    area: 'Tecnologia da Informação',
    valor: 'R$320,00',
    turno: 'Tarde e Noite',
    modalidade: 'Semi Presencial',
  },
  {
    curso: 'Jogos Digitais',
    area: 'Tecnologia da Informação',
    valor: 'R$320,00',
    turno: 'Tarde',
    modalidade: 'Presencial',
  },
  {
    curso: 'Jogos Digitais',
    area: 'Tecnologia da Informação',
    valor: 'R$320,00',
    turno: 'Tarde',
    modalidade: 'Presencial',

  },
  {
    curso: 'Jogos Digitais',
    area: 'Tecnologia da Informação',
    valor: 'R$320,00',
    turno: 'Manhã',
    modalidade: 'EAD',

  },
  {
    curso: 'Jogos Digitais',
    area: 'Tecnologia da Informação',
    valor: 'R$320,00',
    turno: 'Tarde e Noite',
    modalidade: 'Semi Presencial',
  },
  {
    curso: 'Jogos Digitais',
    area: 'Tecnologia da Informação',
    valor: 'R$320,00',
    turno: 'Tarde',
    modalidade: 'Presencial',
  },
  {
    curso: 'Jogos Digitais',
    area: 'Tecnologia da Informação',
    valor: 'R$320,00',
    turno: 'Tarde',
    modalidade: 'Presencial',

  },
];

const ClassroomDetails: React.FC = () => (
  <Container>
    <ClassroomInfo />
    <ListTable
      title="Lista de Alunos"
      subtitle="Informações dos alunos que demonstraram interesse em matricular-se"
      indexToBold={0}
      listTitles={listTitles}
      listItems={listItems}
      itemsPerPages={10}
      currentPage={1}
      totalOfItems={100}
      hasTrashButton
      gridColumn="2 / 5"
    />
  </Container>
);

export default ClassroomDetails;
