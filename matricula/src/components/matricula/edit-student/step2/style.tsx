import styled from 'styled-components';
import { css } from "styled-components";



export const PrincipalDivStep2 = styled.div`
    width: 80%;
    height: 82vh;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0px 0px 0px 1px rgba(63, 63, 68, 0.05), 0px 1px 3px rgba(63, 63, 68, 0.15);
    
`;


export const ConteudoDivStep2 = styled.div`
    padding: 5%;
    display: flex;
    
    align-items: flex-start;
    flex-wrap: wrap;
    //background-color: lightcoral;

    *{

        margin-bottom: 1%;
        padding: 0px;
        
    }
`

export const ContainerDividerStep2 = styled.div`
    width: 100%;
   // background-color: lightsalmon;
    display: flex;
`

export const ConteudoLeftStep2 = styled.div`
    width: 46%;
    //background-color: lightcyan;



`
export const ConteudoRightStep2 = styled.div`
    width: 46%;
    margin-left: 5%;
   // background-color: lightgreen;
`

export const AlignNormalInputStep2 = styled.div`
  margin-top: 8%;
  @media(max-width: 1400px){
      margin-top: 12%
  }
`
export const Align2NormalInputStep2 = styled.div`
  margin-top: 4%;
  @media(max-width: 1400px){
      margin-top: 5%
  }
`

export const FooterFormMatricula = styled.div`
    border-top: 1px solid rgba(228, 231, 235, 1);
    margin-top: -2%;
    width: 100%;
    position: relative;
`

export const ButtonNextStep2Matricula = styled.button`
    text-decoration: none;
    border: none;
    position: absolute;
    color: white;
    background-color: rgba(22, 101, 216, 1);
    border-radius: 4px;
    width: 20%;
    padding-bottom: 2%;
    padding-top: 2%;
    right: 0;
    margin-right: 2%;
    margin-top: 1.8%;
`