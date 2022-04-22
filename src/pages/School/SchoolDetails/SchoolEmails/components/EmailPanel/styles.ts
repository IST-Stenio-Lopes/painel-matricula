import { Form } from '@unform/web';
import styled from 'styled-components';
import { theme } from '../../../../../../global/styles/styles';

export const Container = styled.div`
  display: flex;
  flex: 1;
  grid-column: 2 / 5;
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

  iframe {
    height: 100%;
    border: none;
  }
`;
