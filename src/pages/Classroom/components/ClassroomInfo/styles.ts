import styled, { css } from 'styled-components';
import { theme } from '../../../../global/styles/styles';

interface BarProps {
  width: number;
}

export const Container = styled.div`
  grid-column: 1 / 1;
  display: flex;
  flex-direction: column;
  height: 278px;
  background-color: ${theme.colors.secondary00};
  border: 1px solid ${theme.colors.secondary10};
  box-shadow: 0px 0px 0px 1px rgba(63, 63, 68, 0.05), 0px 1px 3px rgba(63, 63, 68, 0.15);
  border-radius: 4px;

  padding: 24px;
`;

export const Title = styled.h2`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;

  color: ${theme.colors.secondary100};
`;

export const BarContent = styled.div`
  position: relative;
  height: 56px;

  display: flex;
  align-items: center;
`;

export const BackBar = styled.div`
  position: relative;
  background-color: ${theme.colors.secondary10};

  height: 4px;
  width: 100%;

  border-radius: 2px;
`;

export const MiddleBar = styled.div<BarProps>`
  position: absolute;
  background-color: ${theme.colors.orange};
  border-radius: 4px;

  height: 8px;

  ${({ width }) => css`
    width: ${width}%;
  `}
`;

export const ForeBar = styled.div<BarProps>`
  position: absolute;
  background-color: ${theme.colors.green};
  border-radius: 4px;

  height: 8px;

  ${({ width }) => css`
    width: ${width}%;
  `}
`;

export const TextArea = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 2;
  flex-direction: column;
  justify-content: space-between;

  h2 {
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: ${theme.colors.secondary20}
  }
`;
