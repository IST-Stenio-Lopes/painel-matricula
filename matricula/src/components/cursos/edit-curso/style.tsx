import styled from "styled-components";
import { css } from "styled-components";

export const PrincipalDivEditCurso = styled.div`
    width: 95%;
    height: 82vh;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0px 0px 0px 1px rgba(63, 63, 68, 0.05), 0px 1px 3px rgba(63, 63, 68, 0.15);

    position: relative;
    
`;

export const HeadFormCurso = styled.div`
    padding: 1%;
    border-bottom: 1px solid rgba(228, 231, 235, 1);
    display: flex;
`
export const TitleHeadFormCurso = styled.p`
    font-size: 18px;
    color: rgba(58, 59, 63, 1);
    margin-left: 1%;
    font-weight: bolder;
    line-height: 20px;
    margin-top: 1%;
`
export const SubTitleHeadFormCurso = styled.p`
    font-size: 14px;
    color: rgba(180, 191, 201, 1);
    margin-left: 5%;
    margin-top: 1%;
`
export const ConteudoFormCurso = styled.div`
    
`
export const BottomLineCurso = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 10%;
    border-top: 1px solid #E4E7EB;
    
`

export const ButtonSaveFooterCurso = styled.button`
    background-color: #1665D8;
    color: white;
    text-align: center;
    padding-left: 3%;
    padding-right: 3%;
    padding-top: 0.6%;
    padding-bottom: 0.6%;
    border-radius: 4px;
    margin-top: 1%;
    margin-left: 88%;
    border: none;


    @media (max-width: 1500px) {
        margin-left: 86%;
    }
`


export const ConteudoSec1FormCurso = styled.div`
    display: grid;
    padding: 2%;
    *{
        margin-bottom: 6%;
    }
`
export const ConteudoSec2FormCurso = styled.div`
    padding: 2%;
`
export const ConteudoSec1FormCursoDividido = styled.div`
    padding-top: -10%;

    *{
        padding: 0px;
    }
`

export const TextBoxContainer = styled.div`
    margin-top: 5%;
`
export const TextBoxTitle = styled.p`
    color: rgba(180, 191, 201, 1);
    font-size: 13px;
`

export const TextBoxCurso = styled.textarea`
    width: 80%;
    height: 50%;
    padding-bottom: 20%;
    border-color: #DDDDDD;
`

export const ConteudoSec3FormCurso = styled.div`
    background-color: rgba(245, 246, 249, 1);
    padding-top: 2%;
    padding-left: 2%;
    padding-right: 1%;
    padding-bottom: 1%;
    height: 65vh;

    
/*     
    .row{
        width: 100%;
        
    } */
`
export const AlignSec3 = styled.div`
    display: flex;
`
export const TextBoxSec3 = styled.p`
    color: rgba(180, 191, 201, 1);
    font-size: 13px;
`
export const TextBoxSec3Detail = styled.p`
    color: rgba(180, 191, 201, 1);
    font-size: 13px;
    margin-left: 45%;
`
export const InputSec3Name = styled.input`
    border: none;
    border-bottom: 1px solid rgba(180, 191, 201, 1);
    background-color: rgba(245, 246, 249, 1);
    width: 70%;

    :focus{

    outline: 0;
    }

`
export const InputSec3Hours = styled.input`
    border: none;
    border-bottom: 1px solid rgba(180, 191, 201, 1);
    background-color: rgba(245, 246, 249, 1);
    width: 12%;
    margin-left: 9%;

    :focus{
        outline: 0;
    }
`

export const ConteudoProgramaticoSec3 = styled.p`
 border-bottom: 1px solid rgba(180, 191, 201, 1);
 width: 70%;

    @media (max-width: 1500px) {
        font-size: 12px;
    }
`
export const HoursSec3 = styled.p`
    border-bottom: 1px solid rgba(180, 191, 201, 1);
    width: 12%;
    margin-left: 9%;
    text-align: center;

    @media (max-width: 1500px) {
        font-size: 12px;
    }
`

export const ButtonAddListSec3 = styled.button`
   max-width: 28%;
   max-height: 5%;
   color: rgba(30, 123, 226, 1);
   border: none;
    background-color: rgba(245, 246, 249, 1);
   font-size: 15px;
   margin-top: 5%;

   @media (max-width: 1700px) {
        font-size: 12px;
        max-width: 30%;
    }
    @media (max-width: 1500px) {
        font-size: 10px;
    }
`
export const LixeiraImgSec3 = styled.img`
margin-left: 3%;
margin-bottom: 2%;

    @media (max-width: 1500px) {
        margin-bottom: 4%;
    }
`


/*export const LineListSec3 = styled.div`
    width: 90%;
    border-bottom: 1px solid rgba(180, 191, 201, 1);
`
export const AlignCenterSec3 = styled.div`
    text-align: center;
`
export const CompleteSpaceSec3 = styled.div`
    margin-bottom: 50%;
    background-color: red;

    @media (max-width: 1700px) {
        margin-bottom: 60%;
    }
    @media (max-width: 1400px) {
        margin-bottom: 70%;
    }
`

export const ButtonAddListSec3 = styled.button`
   max-width: 28%;
   max-height: 5%;
   color: rgba(30, 123, 226, 1);
   border: none;
    background-color: rgba(245, 246, 249, 1);
   font-size: 15px;
   margin-top: 5%;

   @media (max-width: 1700px) {
        font-size: 12px;
        max-width: 30%;
    }
    @media (max-width: 1500px) {
        font-size: 10px;
    }
`*/