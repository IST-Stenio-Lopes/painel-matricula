import styled, { css } from 'styled-components';
import { theme } from '../../../global/styles/styles';

interface PanelProps {
  gridColumn?: string;
  gridRow?: string;
  width: string;
}

export const Container = styled.div<PanelProps>`
  background-color: ${theme.colors.secondary00};

  border: 1px solid ${theme.colors.secondary10};
  border-radius: 4px;

  box-shadow: 0px 0px 0px 1px rgba(63, 63, 68, 0.05), 0px 1px 3px rgba(63, 63, 68, 0.15);

  display: flex;
  flex-direction: column;
  min-height: 500px;
  min-width: fit-content;
  height: auto;

  ${(props) => props.gridColumn && css`
    display: grid;
    grid-column: ${props.gridColumn};
  `}

  ${(props) => props.gridRow && css`
    display: grid;
    grid-row: ${props.gridRow};
  `}

  ${(props) => css`
    width: ${props.width};
  `}
`;

export const Header = styled.div`
  display: flex;
  flex: 1;
  max-height: 66px;
  padding: 30px 24px;

  align-items: center;

  border-bottom: 1px solid ${theme.colors.secondary20};

  h2 {
    margin-right: 16px;

    font-weight: bold;
    font-size: 16px;
    line-height: 20px;

    color: ${theme.colors.secondary100}
  }

  h3 {
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;

    color: ${theme.colors.secondary20}

  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-grow: 1;
  min-height:  calc(100% - 158px);
`;

export const Footer = styled.div`
  display: flex;
  flex: 1;
  min-height: 92px;
  max-height: 92px;
  padding: 0 24px;
  gap: 16px;
  align-items: center;
  justify-content: flex-end;

  border-top: 1px solid ${theme.colors.secondary20};
`;
