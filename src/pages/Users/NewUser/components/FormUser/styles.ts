import { Form } from '@unform/web';
import styled from 'styled-components';
import { theme } from '../../../../../global/styles/styles';

export const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(375px, 24%) minmax(375px, 24%) minmax(375px, 24%) minmax(375px, 24%);
  gap: 24px;
  padding: 32px 32px 90px 32px;
`;

export const FormContent = styled(Form)`
  display: grid;
  height: 100%;
  grid-template-columns: minmax(520px, 50%) minmax(520px, 50%);

  h3 {
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    margin-bottom: 8px;

    color: ${theme.colors.secondary20};
  }
`;

export const GradeHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 10% 10%;
  grid-template-rows: 36px;
  gap: 24px;
  align-items: center;

  h2 {
    display: flex;
    font-weight: bold;
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
