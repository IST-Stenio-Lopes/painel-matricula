import styled, { css } from 'styled-components';
import { theme } from '../../global/styles/styles';

interface ForegroundProps {
  width: string;
  color: string;
}

interface Background {
  hasLabel: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const Label = styled.h3`
  width: 25%;
  text-align: left;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  margin-left: 16px;

  color: ${theme.colors.secondary60};
`;

export const Background = styled.div<Background>`
  width: 75%;
  height: 4px;
  border-radius: 2px;
  background-color: ${theme.colors.secondary10};

  ${(props) => !props.hasLabel && css`
    width: 100%;
  `}
`;

export const ForegroundBar = styled.div<ForegroundProps>`
  height: 4px;
  border-radius: 2px;

  ${(props) => css`
    width: ${props.width};
    background-color: ${props.color};
  `}
`;
