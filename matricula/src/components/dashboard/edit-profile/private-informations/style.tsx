import styled from "styled-components";
import { css } from "styled-components";


export const UserInformations = styled.div`
    background-color: white;
    width: 60%;
    height: 98%;
    border: 1px solid #DFE2E6;
    border-radius: 5px;
    padding-bottom: 2%;


`

export const Align = styled.div`
    display: table-caption;
    padding: 8%;
`
export const ChangeSize = styled.div`
    width: 60px;
`


export const Head = styled.div`
    border-bottom: 1px solid #DFE2E6;
    width: 100%;

    .row{
        padding: 2%;
    }
    .col-3{
        color: #3A3B3F;
        font-weight: bolder;
        font-size: 0.7rem;
        text-align: right;
    }
    .col-9{
        color: #B4BFC9;
        font-size: 0.5rem;
    }
`

export const Bottom = styled.div`
    border-top: 1px solid #DFE2E6;
    text-align: right;
    padding-bottom: 2%;
`