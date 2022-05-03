import { Form } from '@unform/web';
import styled from 'styled-components';
import { theme } from '../../../../global/styles/styles';

export const Container = styled.div`
  display: flex;
  flex: 1;
  padding: 32px 32px 90px 32px;
`;

export const FormContent = styled(Form)`
  display: grid;
  height: 100%;

  grid-template-columns: minmax(520px, 50%) minmax(520px, 50%);

  h3 {
    max-width: fit-content;
    text-align: justify;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 15px;
    line-height: 18px;
    margin-bottom: 24px;

    color: ${theme.colors.secondary20};
  }
`;
