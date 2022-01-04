import styled from 'styled-components';
import { css } from "styled-components";


export const ModalUploadContainer = styled.div`
    position: fixed;

	font-family: Arial, Helvetica, sans-serif;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(41, 41, 41, 0.25);
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
	width: 70vh;
    height: 70vh;
	position: relative;
	margin: 10% auto;
	padding: 5px 20px 13px 20px;
	border-radius: 5px;
	background: #fff;
    
    z-index: 5;
    }

`

export const ContainerModalSubmit = styled.div`
    margin-top: 5%;
    margin-left: 5%;
    margin-right: 5%;

`
export const MsgMS = styled.p`
    margin-top: 8%;
    font-size: 30px;
    font-weight: bolder;
    padding-bottom: 1%;
    color: rgba(51, 50, 56, 0.8366);
`
export const DescriptionMS = styled.p`
    color: rgba(35, 35, 39, 0.8366);
    font-size: 18px;
`

export const DropZoneMS = styled.div`
    border: 5px dashed blue;
    width:  200px;
    height: 100px;
`