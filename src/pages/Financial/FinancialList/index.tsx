import React from 'react';
import ListTable from '../../../components/ListTable';
import ListSearchArea from '../../../components/ListTable/components/ListSearchArea';
import PageContainer from '../../../components/PageContainer';

const listTitles = [
  {
    id: '4',
    name: 'Nome',
    hasSorting: true,
    hasFilter: true,
    growFactor: '20%',
  },
  {
    id: '1',
    name: 'Turma',
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
    name: 'Whatsapp',
    hasSorting: true,
    hasFilter: true,
    growFactor: '10%',
  },
  {
    id: '5',
    name: 'CPF',
    hasSorting: true,
    hasFilter: true,
    growFactor: '25%',
  },
];

const listItems = [
  {
    titulo: 'Fernando Pinheiro',
    turma: 'Confeiteiro - Bolos Decorados',
    valor: 'R$ 300,00',
    whatsapp: '(83) 98254-3692',
    cpf: '220.634.840-31',
  },
  {
    titulo: 'Fernando Pinheiro',
    turma: 'Confeiteiro - Bolos Decorados',
    valor: 'R$ 300,00',
    whatsapp: '(83) 98254-3692',
    cpf: '220.634.840-31',

  },
  {
    titulo: 'Fernando Pinheiro',
    turma: 'Confeiteiro - Bolos Decorados',
    valor: 'R$ 300,00',
    whatsapp: '(83) 98254-3692',
    cpf: '220.634.840-31',

  },
  {
    titulo: 'Fernando Pinheiro',
    turma: 'Confeiteiro - Bolos Decorados',
    valor: 'R$ 300,00',
    whatsapp: '(83) 98254-3692',
    cpf: '220.634.840-31 e Noite',
  },
  {
    titulo: 'Fernando Pinheiro',
    turma: 'Confeiteiro - Bolos Decorados',
    valor: 'R$ 300,00',
    whatsapp: '(83) 98254-3692',
    cpf: '220.634.840-31',
  },
  {
    titulo: 'Fernando Pinheiro',
    turma: 'Confeiteiro - Bolos Decorados',
    valor: 'R$ 300,00',
    whatsapp: '(83) 98254-3692',
    cpf: '220.634.840-31',

  },
  {
    titulo: 'Fernando Pinheiro',
    turma: 'Confeiteiro - Bolos Decorados',
    valor: 'R$ 300,00',
    whatsapp: '(83) 98254-3692',
    cpf: '220.634.840-31',

  },
  {
    titulo: 'Fernando Pinheiro',
    turma: 'Confeiteiro - Bolos Decorados',
    valor: 'R$ 300,00',
    whatsapp: '(83) 98254-3692',
    cpf: '220.634.840-31 e Noite',
  },
  {
    titulo: 'Fernando Pinheiro',
    turma: 'Confeiteiro - Bolos Decorados',
    valor: 'R$ 300,00',
    whatsapp: '(83) 98254-3692',
    cpf: '220.634.840-31',
  },
  {
    titulo: 'Fernando Pinheiro',
    turma: 'Confeiteiro - Bolos Decorados',
    valor: 'R$ 300,00',
    whatsapp: '(83) 98254-3692',
    cpf: '220.634.840-31',
  },
];

const FinancialList: React.FC = () => (
  <PageContainer gridTemplateRows="36px minmax(500px, 660px)" paddingTop="32px">
    <ListSearchArea listFilters={listTitles} />
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
  </PageContainer>
);

export default FinancialList;
