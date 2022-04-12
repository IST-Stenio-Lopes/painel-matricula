import { Form } from '@unform/web';
import styled from 'styled-components';

export const Container = styled.div`
  grid-column: 2 / 5;
`;

export const FormContent = styled(Form)`
  display: grid;
  height: 100%;

  grid-template-columns: minmax(520px, 50%) minmax(520px, 50%);
`;
