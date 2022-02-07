import styled from 'styled-components';
import { css } from "styled-components";
import { DivProps } from '../../utils/utilities';
/*interface DivProps {
    status?: boolean;
    notifications?: number;
}*/

export const ButtonPainel = styled.div<DivProps>`
    width: 240px;
    height: 50px;
    //background-color: lightcoral;
    padding: 0;

    ${(props) => props.status === true && css`
    background: linear-gradient(90deg, rgba(16, 85, 152, 0.150034) -97.53%, rgba(74, 144, 226, 3e-05) 100%);
        border-left: 6px solid rgba(16, 85, 152, 0.3);
    `}
    

`
export const LateralIcon = styled.img`
 
   
`
export const LateralText = styled.p`
    font-size: 15px;
    font-weight: bolder;
    color: #005CA4;
`
export const LateralNotification = styled.div<DivProps>`
    background-color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    
    box-shadow: gray 1px 1px 2px;
    
    p{
        text-align: center;
        padding-top: 5px;
        font-size: 13px;
        color: #005CA4;
    }
    @media (max-width: 1700px) {
        margin-left: -70%;
    }
`