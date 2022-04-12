import styled, { css } from 'styled-components';
import { theme } from '../../global/styles/styles';

interface HeaderProps {
  gridTemplateColumn: string;
}

interface BodyProps {
  hasTitle: boolean;
}

interface TableProps {
  gridColumn?: string;
  gridRow?: string;
}

export const Container = styled.div<TableProps>`
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

export const TitleHeader = styled.div`
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

    color: ${theme.colors.secondary20};

  }
`;

export const NoItemsText = styled.h2`
  display: flex;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  color: ${theme.colors.secondary20};

  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 18px 25px;
`;

export const Header = styled.div<HeaderProps>`
  display: grid;
  width: 100%;
  height: 55px;
  padding: 0 24px;
  border-bottom: 1px solid ${theme.colors.secondary10};

  ${(props) => css`
    grid-template-columns: ${props.gridTemplateColumn};
  `}
`;

export const Body = styled.div<BodyProps>`
  width: 100%;
  height: calc(100% - 110px);

  ${({ hasTitle }) => hasTitle && css`
    height: calc(100% - 176px);
  `}
`;

export const SkeletonContent = styled.div`
  margin: 5px;
`;

export const Footer = styled.div`
  border-top: 1px solid ${theme.colors.secondary10};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  min-height: 55px;
  max-height: 55px;
  padding: 0 24px;
`;

export const ButtonsNavArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 100%;
`;

export const InfoPageText = styled.h3`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;

  color: ${theme.colors.secondary60};

  margin-right: 24px;
`;
