import styled from 'styled-components';
import { css } from "styled-components";


export const SmallProfile = styled.div`
    background-color: white;
    width: 35vh;
    height: 20vh;
    border: 1px solid #DFE2E6;
    border-radius: 8px;
    display: flex;


    .col-7{
        padding-top: 5%;
        padding-left: 10%;
    }
    .col-5{
        padding-top: 4%;

    }
    `

export const ButtonsContainer = styled.div`
    border-top: 1px solid #DFE2E6;
    padding: 0px;
    margin-left: 0.1%;
    align-items: center;
    text-align: center;
    
    a{ 
        text-decoration: none;
        font-size: 0.65rem;

        
    }
    .col-6{
        :last-child a{
            color: #425A70;
        }
    }
    
    
`

export const NameProfile = styled.p`
    font-size: 12px;
    font-weight: bolder;
`

export const WorkProfile = styled.p`
    font-size: 10px;
    color: lightgray;
    margin-top: -5%;
`