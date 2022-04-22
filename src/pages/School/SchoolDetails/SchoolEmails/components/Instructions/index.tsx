import React from 'react';

import { Container } from './styles';

const title = 'Durante a formatação do e-mail automático certifique-se de incluir as palavras chaves: Nome do aluno, Curso, Turno e Unidade. Como no exemplo a seguir:';
const list = '[Nome do Aluno], [Curso], [Turno], [Unidade]';
const obs = ' Não esqueça de incluir as palavras chaves dentro dos colchetes [Nome do Aluno]';

const Instructions: React.FC = () => (
  <Container>
    <h2>Instruções</h2>
    <h3>
      {title}
    </h3>
    <br />
    <h4>{list}</h4>
    <br />
    <h3>
      <b>OBS:</b>
      {obs}
    </h3>
  </Container>
);

export default Instructions;
