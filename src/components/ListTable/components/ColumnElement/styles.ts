import styled, { css } from 'styled-components';
import { theme } from '../../../../global/styles/styles';

interface ElementProps {
  isBold: boolean;
}

export const Container = styled.div<ElementProps>`
  display: flex;
  align-items: center;
  padding-right: 15px;

  h3 {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    direction: ltr;


    font-weight: 500;
    font-size: 14px;
    line-height: 20px;

    color: ${theme.colors.secondary70}

    ${(props) => props.isBold && css`
      color: ${theme.colors.secondary100}
    `}
  }
`;
