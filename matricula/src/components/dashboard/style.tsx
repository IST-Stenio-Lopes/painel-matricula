import styled from 'styled-components';
import { css } from "styled-components";
import { DahboardAreaExpand } from '../../utils/utilities';

export const NavCompensing = styled.div<DahboardAreaExpand>`
  background-color: #005CA4;
  position: absolute;
  margin-left: 26.3vh;
  height: 75px;
  width: 50%;
  ${(props) => props.status === true && css`
        height:  276px;
        border-left: 6px solid rgba(16, 85, 152, 0.5);
    `}

`

export const PreencherCol10 = styled.div`
    height: 89vh;

    @media(max-width: 1500px) {
    height: 100vh;
  }
`