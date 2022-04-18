import styled, { css } from 'styled-components';
import { theme } from '../../../global/styles/styles';

interface ContainerProps {
  top: string;
  left?: string;
  bottom?: string;
  right?: string;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  width: 100%;
  top: 10px;

  ${({ top }) => css`
    top: ${top};
  `}

  ${({ left }) => left && css`
    left: ${left};
  `}
  ${({ bottom }) => bottom && css`
    bottom: ${bottom};
  `}
  ${({ right }) => right && css`
    right: ${right};
  `}

`;

export const Panel = styled.div`
  position: relative;

  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;

  position: absolute;
  right: 0;

  background-color: ${theme.colors.secondary00};
  border-radius: 4px;
  box-shadow: 0px 0px 20px 3px rgba(63, 63, 68, 0.1), 0px 1px 3px rgba(63, 63, 68, 0.15);
`;
