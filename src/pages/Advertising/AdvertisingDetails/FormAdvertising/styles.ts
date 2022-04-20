import { Form } from '@unform/web';
import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(375px, 25%) minmax(375px, 25%) minmax(375px, 25%) minmax(375px, 25%);
  grid-template-rows: auto auto;
  gap: 24px;
  padding: 32px 32px 90px 32px;
`;

export const FormContent = styled(Form)`
  display: grid;
  height: 100%;

  grid-template-columns: minmax(520px, 70%) minmax(520px, 30%);
`;

export const LeftContent = styled.div`
  display: grid;
  grid-template-rows: max-content 60px;
  gap: 24px;
  align-items: flex-start;
`;

export const ButtonArea = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  max-height: 60px;

  gap: 32px;

  grid-column: 1 / 1 ;
`;
