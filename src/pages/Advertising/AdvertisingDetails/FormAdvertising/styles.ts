import { Form } from '@unform/web';
import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(375px, 25%) minmax(375px, 25%) minmax(375px, 25%) minmax(375px, 25%);
  gap: 24px;
  padding: 32px 32px 90px 32px;
`;

export const FormContent = styled(Form)`
  display: grid;
  height: 100%;

  grid-template-columns: minmax(520px, 70%) minmax(520px, 30%);
`;
