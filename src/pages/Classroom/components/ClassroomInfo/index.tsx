import React from 'react';

import {
  Container, Title, BarContent, BackBar, MiddleBar, ForeBar, TextArea,
} from './styles';

const ClassroomInfo: React.FC = () => (
  <Container>
    <Title>Eletricista de Automóveis</Title>
    <BarContent>
      <BackBar />
      <MiddleBar width={50} />
      <ForeBar width={30} />
    </BarContent>
    <TextArea>
      <h2>Matriculados: 6</h2>
      <h2>Reservados: 4</h2>
      <h2>Vagas disponíveis: 10</h2>
      <h2>Lista de espera: 8</h2>
      <h2>Expirados: 8</h2>
    </TextArea>
  </Container>
);

export default ClassroomInfo;
