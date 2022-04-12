import { Form } from '@unform/web';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const FormContent = styled(Form)`
  display: grid;

  grid-template-columns: 1fr 1fr;
  column-gap: 32px;

  padding: 32px;
`;

export const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: flex-end;

  padding: 32px;
  gap: 32px;
`;
