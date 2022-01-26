import styled from "styled-components";
import { css } from "styled-components";

interface OptionSelectBoxMatriculaI {
    name: string,
    value: string
}

export const FieldSelectBoxMatricula = styled.div`
    width: 14%;
    border-radius: 4px;
    filter: drop-shadow(0px 1px 5px #ECEDEE);
    background-color: white;
    padding-top: 1%;
    padding-bottom: 1%;
    display: grid;
    position: absolute;
    left: 73%;
    margin-top: 2%;
    margin-left: 5%;
    z-index: 2;
    

`
export const OptionSelectBoxMatricula = styled.div<OptionSelectBoxMatriculaI>`
    width: 100%;
    padding-top: 2%;
    padding-bottom: 2%;
    color: rgba(158, 160, 165, 1);
    cursor: pointer;

    ${(props) => props.name === props.value && css`
        background: linear-gradient(to right, rgba(172, 213, 255, 0.3) , rgba(74,144,226,0.01)70%);
        border-left: 3px solid rgba(74, 144, 226, 0.3);

        color: rgba(0, 92, 164, 1);
    `}

`

export const ImageSelectBoxMatricula = styled.img`
    margin-left: 10%;
    padding-right: 10%;
`

/*export const StatusColor = styled.p`
    ${(props) => props.description === 'funcionando' && css`
        color: #2BC079;
    `}

    ${(props) => props.description === 'manutencao' && css`
        color: #C66B00;
    `}

    ${(props) => props.description === 'pausa' && css`
        color: #C02B2B;
    `}
`*/