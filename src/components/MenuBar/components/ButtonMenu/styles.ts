import { CSSTransition } from 'react-transition-group';
import styled, { css } from 'styled-components';
import { theme } from '../../../../global/styles/styles';

interface ButtonProps {
  isSelected: boolean;
}

interface NotificationProps {
  isOpen: boolean;
}

export const LeftBar = styled.div`
  position: absolute;
  left: 0;
  height: 50px;
  width: 5px;

  background: transparent;
`;

export const Container = styled.div<ButtonProps>`
  overflow-x: hidden;
  display: flex;
  flex: 1;
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background: white;

  :hover {
    cursor: pointer;
    background: linear-gradient(to right, ${theme.colors.secondary05} , ${theme.colors.secondary00});
  }

  h1 {
    white-space: nowrap;
    display: flex;
    flex: 1;
    flex-grow: 1;
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;
    color: ${theme.colors.secondary60}
  }

  ${(props) => props.isSelected && css`
      background: linear-gradient(to right, ${theme.colors.primary20} , ${theme.colors.secondary00});

    h1 {
      color: ${theme.colors.primary100};
    }

    ${LeftBar} {
      background: ${theme.colors.primary20};
    }
  `}
`;

export const TransitionGroup = styled(CSSTransition)`
  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    opacity: 1;
    transition: opacity 400ms;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit-active {
    opacity: 0;
    transition: opacity 400ms;
  }
`;

export const IconContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 60px;


`;

export const NotificationCount = styled.div<NotificationProps>`
  position: absolute;
  right: 0;

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

  ${(props) => !props.isOpen && css`
    width: 20px;
    height: 20px;

    transform: translate(100%, -50%);
  `}
`;
