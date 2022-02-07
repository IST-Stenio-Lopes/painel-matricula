import styled from 'styled-components';
import { css } from "styled-components";




export const Mensages = styled.div`
    background-color: white;
    border: 1px solid #E4E7EB;
    border-radius: 5px;
    width: 100%;
    height: 518px;
    padding-left: 10px;
    padding-top: 6px;
    padding-right: 4px;
    padding-bottom: 1px;
    margin-top: 17%;

    .row:first-child{
        border-bottom: 1px solid #E4E7EB;
        margin-left: 2px;
        margin-right: 2px;
        padding-bottom: -15%;
        height: 100px;
    }
    .row .col-3:first-child{
        margin-top: 2%;
    }
    .row .col-9:first-child{
        margin-top: 10px;
        margin-bottom: -50px;
        height: 80px;

        @media(max-width: 1500px) {
            
        }
    }
   
`

export const Title = styled.p`
    font-size: 20px;
    font-weight: bolder;
    margin-bottom: 10%;

    @media(max-width: 1500px) {
        font-size: 15px;
    }
`

export const Hours = styled.p`
    font-size: 12px;
    color: #8798AA;
    padding-top: 10px;
    margin-left: -25px;
    margin-bottom: 0px;
    padding: 0px;

    @media(max-width: 1500px) {
        margin-left: -20px;
        white-space: nowrap;
    }
`
export const NameUserMensager = styled.p`
    font-weight: bolder;
    font-size: 16px;
    margin-top: 5%;
    margin-bottom: 0px;

    @media(max-width: 1500px) {
        font-size: 12px;
        white-space: nowrap;
    }
`
export const UserMensagerContent = styled.p`
    font-size: 12px;
    color: #9EA0A5;
    margin: 0 auto;
    margin-top: -10%;

`

export const LinkExpandMessages = styled.a`
    color: #1070CA;
    font-size: 12px;
    ::after{content: '⏵';};
    text-decoration: none;
    padding-left: 70%;
    white-space: nowrap;
`