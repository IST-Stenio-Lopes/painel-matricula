import styled, { css } from 'styled-components';
import { theme } from '../../../../global/styles/styles';

interface ContainerProps {
  isSelected: boolean;
}

export const LeftBar = styled.div`
  position: absolute;
  left: 0;
  height: 25px;
  width: 5px;

  background: transparent;
`;

export const Container = styled.div<ContainerProps>`
  border: 0;
  background-color: transparent;

  display: flex;
  flex-direction: row;
  align-items: center;

  height: 25px;

  padding: 3px 23px;

  color: ${theme.colors.secondary60};

  svg {
    margin-right: 23px;
  }

  h2 {
    font-weight: 500;
    font-size: 14px;
    line-height: 27px;
  }

  ${({ isSelected }) => isSelected && css`
    color:  ${theme.colors.primary50};

    background: linear-gradient(to right, ${theme.colors.primary20} , ${theme.colors.secondary00});

    ${LeftBar} {
      background: ${theme.colors.primary20};
    }
  `}

  :hover {
    background-color: ${theme.colors.secondary05};
  }
`;
