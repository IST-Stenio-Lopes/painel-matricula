import styled from 'styled-components';
import { css } from "styled-components";




export const Window = styled.div`
    background-color: white;
    border: 2px solid #E4E7EB;
    border-radius: 5px;
    //width: 100%;
    //height: 240px;
    height: 300%;
    width: 16%;
    padding-left: 10px;
    padding-top: 6px;
    padding-right: 6px;
    padding-bottom: 10px;
    padding-bottom: 10px;
    margin-top: 1%;
    margin-left: 14%;
    position: absolute;
    z-index: 1;
    button.btn{
        margin-left: 0;
        width: 100%;
        :hover{
            //caso seja necessário
            color: rgb(42, 120, 197);
        }
        :focus{
            //ativa quando é clicado
            box-shadow: none; //remove a borda do Bootstrap quando seleciona o botão
        }
     ;
      
    }
    .last{
        border: none;
    }

`
export const WindowSetting = styled.div`
    border-bottom: 1px solid #e4e7eb;
    height: 30%;
    margin-top: 3%;
    display: flex;


  
    .col-3{
        padding-right: 0px;
    }
    .col-9{
      
        text-align: left;
    }
`
