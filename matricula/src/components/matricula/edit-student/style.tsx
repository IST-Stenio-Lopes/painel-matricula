import styled from 'styled-components';
import { css } from "styled-components";
import { ValueStatusProgressMatricula } from '../../../utils/utilities';


export const Fluxo = styled.div<ValueStatusProgressMatricula>`
    background-color: white;
    width: 90%;
    height: 20vh;
    border-radius: 5px;
    margin-bottom: 20%;
    margin-left: 4%;
    box-shadow: 0px 0px 0px 1px rgba(63, 63, 68, 0.05), 0px 1px 3px rgba(63, 63, 68, 0.15);

   
    p{
        padding-top: 2.5%;
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

export const HeadFormMatricula = styled.div`
    padding: 2%;
    border-bottom: 1px solid rgba(228, 231, 235, 1);
    display: flex;
`
export const TitleHeadFormMatricula = styled.p`
    font-size: 18px;
    color: rgba(58, 59, 63, 1);
    margin-left: 1%;
    font-weight: bolder;
    line-height: 20px;
    margin-top: 1%;
`
export const SubTitleHeadFormMatricula = styled.p`
    font-size: 14px;
    color: rgba(180, 191, 201, 1);
    margin-left: 5%;
    margin-top: 1%;
`
export const BottomMatricula = styled.div`
    border-top: 1px solid #DFE2E6;
    margin-top: 3%;
    text-align: right;
`