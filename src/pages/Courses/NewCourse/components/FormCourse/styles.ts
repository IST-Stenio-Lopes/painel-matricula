import { Form } from '@unform/web';
import styled from 'styled-components';
import { theme } from '../../../../../global/styles/styles';

export const Container = styled.div`
  display: flex;
  flex: 1;
  padding: 32px 32px 90px 32px;
`;

export const FormContent = styled(Form)`
  display: grid;
  height: 100%;

  grid-template-columns: minmax(520px, 33.33%) minmax(520px, 33.33%) minmax(520px, 33.33%);
`;

export const GradeHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 10% 10%;
  grid-template-rows: 36px;
  gap: 24px;
  align-items: center;

  h2 {
    display: flex;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;

    color: ${theme.colors.secondary20};
  }
`;

export const AddButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  margin: 16px 0;
`;
