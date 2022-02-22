import React from "react";
import styled from "styled-components";
import { css } from "styled-components";

interface StyledTextArea {
    sWidth: number;
    sHeight: number;
    error: boolean;
    msgError?: string;
}



export const ContainerTextAreaBox = styled.div`
    margin-bottom: 0px;
    height: 60%;
`



export const TextAreaBox = styled.textarea<StyledTextArea>`
    
    padding: 15px;
    max-width: ${(p: StyledTextArea) => p.sWidth}vh;
    height: ${(p: StyledTextArea) => p.sHeight}vh;
    border-color: #DDDDDD;
    ${(props) => props.error === true && css`
        border-color: red;
    `}
    margin-top: -7%;

    resize: none;

`
//#DDDDDD;
export const HeadTextAreaBox = styled.p`
    color: #B4BFC9;
    
`

export const MsgErrorFaqTexAreaBox = styled.p`
    color: red;
    flex-wrap: nowrap;
    @media(max-width: 1500px) {

    }

`