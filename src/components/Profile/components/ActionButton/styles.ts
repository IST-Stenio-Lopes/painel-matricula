import styled, { css } from 'styled-components';
import { theme } from '../../../../global/styles/styles';

interface ButtonProps {
  color?: string;
}

export const Container = styled.button<ButtonProps>`
  border: 0;
  background-color: transparent;

  display: flex;
  flex-direction: row;
  align-items: center;

  height: 66px;

  padding: 0 23px;

  border-bottom: 1px solid ${theme.colors.secondary60};
  color: ${theme.colors.secondary60};

  svg {
    margin-right: 23px;
  }

  h2 {
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;
  }

  ${(props) => props.color && css`
    color: ${props.color};
  `}

  :hover {
    background-color: ${theme.colors.secondary05};
  }
`;
