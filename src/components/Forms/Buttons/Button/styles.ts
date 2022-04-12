import styled, { css } from 'styled-components';
import { shade } from 'polished';
import { theme } from '../../../../global/styles/styles';

interface ButtonProps {
  gridColumn?: string;
  gridRow?: string;
  color?: string;
  hasOutline?: boolean;
  width: string;
  styleType: 'filled' | 'outline';
  minHeight?: string;
  maxHeight?: string;
  maxWidth?: string;
  iconWithMargin?: boolean;
  disabled?: boolean;
}

export const Container = styled.button<ButtonProps>`
  align-self: center;
  display: flex;
  flex: 1;

  width: 100%;

  justify-content: center;
  align-items: center;

  border-radius: 4px;

  background-color: ${theme.colors.primary50};
  color: ${theme.colors.secondary00};
  border: 1px solid ${theme.colors.primary50};

  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;

  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.2, theme.colors.primary50)}
  }


  ${({ iconWithMargin }) => iconWithMargin && css`
    svg {
      margin-right: 12px;
    }
  `}

  ${(props) => props.gridColumn && css`
    grid-column: ${props.gridColumn};
  `}

  ${(props) => props.gridRow && css`
    grid-row: ${props.gridRow};
  `}

  ${(props) => props.width && css`
    width: ${props.width};
  `}

  ${(props) => props.minHeight && css`
    min-height: ${props.minHeight};
  `}

  ${(props) => props.maxHeight && css`
    max-height: ${props.maxHeight};
    min-height: ${props.maxHeight};
  `}

  ${(props) => props.maxWidth && css`
    max-width: ${props.maxWidth};
  `}

  ${({ styleType }) => styleType === 'outline' && css`
    color: ${theme.colors.primary50};
    background-color: ${theme.colors.secondary00};

    &:hover {
      background-color: ${shade(0.1, theme.colors.secondary00)}
    }
  `}

  ${({ color }) => color && css`
    color: ${color};
    border-color: ${color};
  `}

  ${({ hasOutline }) => !hasOutline && css`
    border: 0;
  `}

  ${({ disabled }) => disabled && css`
    border: 0;
    background-color: ${theme.colors.secondary10};
    cursor: default;

    &:hover {
      background-color: ${theme.colors.secondary10}}
    }
  `}
`;
