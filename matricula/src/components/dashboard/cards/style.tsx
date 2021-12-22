import styled from 'styled-components';
import { css } from "styled-components";
import { DivProps, PercentNumber } from '../../../utils/utilities';


export const CardPainelActived = styled.div`
    /*width: 375px;
    height: 152px;*/
    padding-left: 5%;
    padding-top: 3%;
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 8px;
`

export const CardPainelDesable = styled.div`
    /*width: 375px;
    height: 152px;*/
    max-height: 152px;
    padding-left: 5%;
    padding-top: 3%;
    width: 100%;
    height: 100%;
    background-color: #E0E1E3; 
    border-radius: 8px;
`
/*${(props) => props.status === false && css`
        background-color: #E0E1E3;
    `}*/
export const CardTitle = styled.p`
    font-size: 12px;
    color: #66788A;
    font-weight: bolder;
`
export const CardInformation = styled.p`
    font-size: 24px;
    color: #212529;
`
export const CardStatistic = styled.div<PercentNumber>`
    font-size: 12px;
    display: flex;
    margin-top: 10%;

    ${(props) => props.percent > 0 ? css`
        color: green;
        ::before{content: '⏶';};
        
    `: css`
        color: red;
        ::before{content: '⏷';};
    `
    }
    p{
        color: #66788A;
        margin-left: 10px;
    }

`
export const CardProgressBar = styled.div`
    margin-top: 15%;
    width: 95%;
`