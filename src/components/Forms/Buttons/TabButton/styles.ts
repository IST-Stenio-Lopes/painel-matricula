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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  pointer-events:none;

  ${(props) => !props.disabled && css`
  pointer-events:all;
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

export const NotificationCount = styled.div`
  position: absolute;
  right: -20px;
  top: 5px;

  background: ${theme.colors.primary50};
  box-shadow: 1px 2px 5px rgba(195, 195, 195, 0.5);

  margin: 0 30px;

  width: 24px;
  height: 24px;

  border-radius: 50%;

  display:flex;
  align-items: center;
  justify-content: center;

  h2 {
    font-weight: 500;
    font-size: 11px;
    line-height: 16px;
    color: ${theme.colors.secondary00}
  }
`;
