import styled from 'styled-components';
import { theme } from '../../../../../../global/styles/styles';

export const Container = styled.div`
  height: max-content;
  background-color:  #E0E1E3;
  border-radius: 4px;

  padding: 20px 24px;

  text-align: justify;

  font-size: 12px;
  line-height: 18px;

  color: ${theme.colors.secondary70};

  h2 {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;

    color: ${theme.colors.secondary60};

    margin-bottom: 10px;
  }

  h3 {
    font-weight: 400;

  }

  h4 {
    font-weight: 700;
    color: ${theme.colors.secondary80};

  }
`;
