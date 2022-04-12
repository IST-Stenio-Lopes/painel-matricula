import styled, { css } from 'styled-components';
import { theme } from '../../../global/styles/styles';

interface PanelProps {
  gridColumn?: string;
  gridRow?: string;
}

export const Container = styled.div<PanelProps>`
  background-color: ${theme.colors.secondary00};

  border: 1px solid ${theme.colors.secondary10};
  border-radius: 4px;

  box-shadow: 0px 0px 0px 1px rgba(63, 63, 68, 0.05), 0px 1px 3px rgba(63, 63, 68, 0.15);

  ${(props) => props.gridColumn && css`
    grid-column: ${props.gridColumn};
  `}

  ${(props) => props.gridRow && css`
    grid-row: ${props.gridRow};
  `}

`;

export const Header = styled.div`
  display: flex;
  flex: 1;
  height: 48px;
  padding: 24px;

  align-items: center;

  h2 {
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;

    color: ${theme.colors.secondary100}
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-grow: 1;
  height: calc(100% - 86px);
  overflow-y: scroll;

`;

export const Footer = styled.div`
  display: flex;
  flex: 1;
  height: 38px;
  padding: 0 24px;

  align-items: center;
  justify-content: flex-end;

  border-top: 1px solid ${theme.colors.secondary20};
`;
