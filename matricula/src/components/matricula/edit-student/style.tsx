import styled from 'styled-components';
import { css } from "styled-components";
import { ValueStatusProgressMatricula } from '../../../utils/utilities';


export const Fluxo = styled.div<ValueStatusProgressMatricula>`
    background-color: white;
    width: 90%;
    height: 40%;
    border-radius: 5px;
    margin-bottom: 20%;
    margin-left: 4%;
    border: 2px solid rgba(63, 63, 68, 0.05);

    p{
        margin-top: 5%;
        font-weight: bolder;
        margin-left: 15%;
    }

    p:nth-child(1){
        
        ${(props) => props.num === 1 && css`
            color: rgba(30, 123, 226, 1);
        `}
        ${(props) => props.num === 2 && css`
            color: rgba(58, 59, 63, 1);
        `}
        ${(props) => props.num === 3 && css`
            color: rgba(58, 59, 63, 1);
        `}
    }
    p:nth-child(2){
        
        ${(props) => props.num === 1 && css`
            color: rgba(180, 191, 201, 1);
        `}
        ${(props) => props.num === 2 && css`
            color: rgba(30, 123, 226, 1);
        `}
        ${(props) => props.num === 3 && css`
            color: rgba(58, 59, 63, 1);
        `}
    }
    p:nth-child(3){
        
        ${(props) => props.num === 1 && css`
            color: rgba(180, 191, 201, 1);
        `}
        ${(props) => props.num === 2 && css`
            color: rgba(180, 191, 201, 1);
        `}
        ${(props) => props.num === 3 && css`
            color: rgba(30, 123, 226, 1);
        `}
    }
  
`  /*${(props) => props.num === 1 && css`
        
    `}*/