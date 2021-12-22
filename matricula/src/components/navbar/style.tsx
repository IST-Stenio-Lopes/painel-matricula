import styled from 'styled-components';
import { css } from "styled-components";
import { DahboardAreaExpand, NotificationReceived } from '../../utils/utilities';



export const NavbarTop = styled.div<DahboardAreaExpand>`
  padding-top: 20px;
  padding-left: 20%;
  background-color: #005CA4;
  width: 100.5%;
  height: 75px;
  ${(props) => props.status === true && css`
        height:  175px;
        z-index: 2;
    `}
  button{
    :focus{
            //ativa quando é clicado
            box-shadow: none; //remove a borda do Bootstrap quando seleciona o botão
        }
  }
`

export const BellNotification = styled.div<NotificationReceived>`
  
  ${(props) => props.status === false && css`
      display: none;
  `}
`
