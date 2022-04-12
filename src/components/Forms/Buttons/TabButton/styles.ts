import styled, { css } from 'styled-components';
import { theme } from '../../../../global/styles/styles';

interface ButtonProps {
  isSelected: boolean;
  disabled: boolean;
}

export const TabName = styled.h2`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;

  height: 100%;
  min-width: 100px;

  margin: 0 32px;


  display: flex;
  justify-content: center;
  align-items: center;

  color: ${theme.colors.secondary20};
`;

export const Indicator = styled.div`
  width: 78px;
  height: 3px;

  background-color: transparent;
`;

export const Container = styled.div<ButtonProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  pointer-events:none

  ${(props) => !props.disabled && css`
    cursor: pointer;

    :hover{
      background-color: ${theme.colors.secondary05};
    }
  `}

  ${(props) => props.isSelected && css`

    ${Indicator} {
      background-color: ${theme.colors.primary100};
    }

    ${TabName} {
      color: ${theme.colors.secondary100};
    }
  `}
`;
