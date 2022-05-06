import React from 'react';

import { Container } from './styles';

const title = 'Durante a formatação do e-mail automático certifique-se de incluir as palavras chaves: Nome do aluno, Curso, Turno e Unidade. Como no exemplo a seguir:';
const reservedKeys = '[Nome do Aluno], [Curso], [Turno], [Unidade], [Email], [Dias]';
const enrollmentKeys = '[Nome do Aluno], [Curso], [Turno], [Unidade], [Email]';
const obs = ' Não esqueça de incluir as palavras chaves dentro dos colchetes [Nome do Aluno]';

interface InstructionsProps {
  instructionType: 'Reserva' | 'Matricula' | 'Lean'
}
const Instructions: React.FC<InstructionsProps> = ({ instructionType }) => (
  <Container>
    <h2>Instruções</h2>
    <h3>
      {title}
    </h3>
    <br />
    <h4>
      {instructionType === 'Reserva'
        ? reservedKeys
        : enrollmentKeys}
    </h4>
    <br />
    <h3>
      <b>OBS:</b>
      {obs}
    </h3>
  </Container>
);

export default Instructions;
