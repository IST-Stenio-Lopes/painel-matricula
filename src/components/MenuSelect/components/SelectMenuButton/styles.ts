import styled, { css } from 'styled-components';
import { theme } from '../../../../global/styles/styles';

interface ButtonProps {
  selected: boolean;
  gridRow?: string;
  gridColumn?: string;
  disabled?: boolean;
}
export const Container = styled.div<ButtonProps>`
  width: 100%;
  height: 28px;
  color: ${theme.colors.secondary20};
  padding: 0 24px;

  h2 {
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
  }

  ${({ selected }) => (selected ? css`
    color: ${theme.colors.primary50};
  ` : css`
    color: ${theme.colors.secondary100};
  `)}

  ${({ disabled }) => !disabled && css`
    h2 {
      font-weight: 600;
    }
    :hover {
      cursor: pointer;

      background-color: ${theme.colors.primary10};
    }
  `}
`;
