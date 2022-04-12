import styled, { css } from 'styled-components';

interface ContainerProps {
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  paddingTop?: string;
}

export const Container = styled.div<ContainerProps>`
  margin-left: 102px;
  margin-top: 74px;
  margin-right: 40px;
  padding-bottom: 90px;

  min-height: 100%;

  ${(props) => props.gridTemplateColumns && css`
    display: grid;
    grid-template-columns: ${props.gridTemplateColumns};
    gap: 32px;
  `}

  ${(props) => props.gridTemplateRows && css`
    display: grid;
    grid-template-rows: ${props.gridTemplateRows};
    gap: 32px;
  `}

  ${(props) => props.paddingTop && css`
    padding-top: ${props.paddingTop};
  `}
`;
