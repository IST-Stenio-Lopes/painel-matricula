import styled from 'styled-components';
import { theme } from '../../global/styles/styles';

export const TopBar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  right: 0;
  top: 0;
  width: 100vw;
  height: 74px;

  background-color: ${theme.colors.primary100};
  padding: 0 84px;
  padding-right: 46px;
  z-index: 10;
`;

export const DashboardTopBar = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 100vw;
  height: 276px;

  z-index: -1;
  background-color: ${theme.colors.primary100};
`;

export const SideBar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 62px;
  background-color: ${theme.colors.secondary00};
  overflow: scroll;
  box-shadow: 0px 0px 0px 1px rgba(63, 63, 68, 0.05), 0px 1px 3px rgba(63, 63, 68, 0.15);
  z-index: 20;
  transition: 0.2s ease-in;

  :hover {
    width: 240px;
  }
`;

export const HeaderArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
`;

export const BodyArea = styled.div`

`;

export const FooterArea = styled.div`
  height: 74px;
  width: 100%;
`;
