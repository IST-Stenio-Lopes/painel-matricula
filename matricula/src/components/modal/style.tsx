import styled from 'styled-components';
import { css } from "styled-components";
import { ChangeStyle, ModalItens } from '../../utils/utilities';


export const ModalContainer = styled.div`
    position: fixed;

	font-family: Arial, Helvetica, sans-serif;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(0,0,0,0.8);
	z-index: 999;
	opacity:1;
	-webkit-transition: opacity 400ms ease-in;
	-moz-transition: opacity 400ms ease-in;
	transition: opacity 400ms ease-in;
	pointer-events: auto; //se colocar nono, não dá pra clicar em nada
    
    /* :target {
        opacity: 1;
        pointer-events: auto;
    } */
    
    >div {
	width: 50vh;
    height: 42vh;
	position: relative;
	margin: 10% auto;
	padding: 5px 20px 13px 20px;
	border-radius: 10px;
	background: #fff;

    z-index: 5;

    @media (max-width: 1500px) {
        height: 45vh;
    }
    }


`

/*export const Close = styled.a`
    background: #606061;
    color: #FFFFFF;
    line-height: 25px;
    position: absolute;
    right: -12px;
    text-align: center;
    top: -10px;
    width: 24px;
    text-decoration: none;
    font-weight: bold;
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    border-radius: 12px;
    -moz-box-shadow: 1px 1px 3px #000;
    -webkit-box-shadow: 1px 1px 3px #000;
    box-shadow: 1px 1px 3px #000;

    :hover {
        background: #00d9ff;
    }
`*/

export const ImgModal = styled.img`

    margin-left: auto;
	margin-right: auto;
	display: block;
    padding-bottom: 5%;
    margin-top: 5%;


`
export const Msg = styled.p`
    text-align: center;
    font-size: 20px;
    font-weight: bolder;
    padding-bottom: 5%;

`
export const Anc = styled.a`


`
export const Btn = styled.button<ChangeStyle>`
    margin-left: auto;
	margin-right: auto;
    border-radius: 5px;
    width: 20vh;
    height: 5vh;
    text-decoration: none;
    border: 1px solid lightgray;
    background-color: white;
    color: gray;

    :hover{
        transition: 300ms;
        background-color: lightgray;
        box-shadow: 0 0 0.5em gray;
    }

    ${(props) => props.change === true && css`
        background-color: #005CA4;
        color: white;
        border: 1px solid #005CA4;

        :hover{
        transition: 300ms;
        background-color: #005CA4;
        box-shadow: 0 0 0.5em blue;
       
    }

    `}

`