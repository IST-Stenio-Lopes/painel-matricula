import styled from 'styled-components';
import { css } from "styled-components";




export const Mensages = styled.div`
    background-color: white;
    border: 2px solid #E4E7EB;
    border-radius: 5px;
    //width: 100%;
    height: 540px;
    padding-left: 10px;
    padding-top: 6px;
    padding-right: 4px;
    padding-bottom: 1px;
    margin-top: 1%;
    margin-right: 3%;
    position: absolute;
    z-index: 1;
    @media (max-width: 1500px) {
        height: 518px;
    }
    .row:first-child{
        border-bottom: 1px solid #E4E7EB;
        margin-left: 2px;
        margin-right: 2px;
        padding-bottom: -15%;
        height: 100px;
    }
    .row .col-3:first-child{
        margin-top: 8%;
        
    }
    .row .col-9:first-child{
        margin-top: 10px;
        margin-bottom: -50px;
        height: 80px;
    }
`

export const Title = styled.p`
    font-size: 13px;
    color: #9EA0A5;
    font-weight: lighter;
    margin-bottom: 10%;
    display: flex;
    pre{
        color: blue;
        font-size: 13px;
    }
`

export const Hours = styled.p`
    font-size: 12px;
    color: #8798AA;
    padding-top: 10px;
    margin-left: -25px;
    margin-top: 4px;
    margin-bottom: 0px;
    padding: 0px;

`
export const NameUserMensager = styled.p`
    font-weight: bolder;
    display: flex;
    font-size: 12px;
    margin-top: 5%;
    margin-bottom: 0px;
`
export const UserMensagerContent = styled.p`
    font-size: 12px;
    color: #9EA0A5;
    margin: 0 auto;
    margin-top: -10%;

`

export const LinkExpandMessages = styled.a`
    color: #1070CA;
    position: absolute;
    font-weight: bolder;
    font-size: 17px;
    //::after{content: '⏵';};
    text-decoration: none;
    margin-top: 2%;
    padding-left: 38%;

`
