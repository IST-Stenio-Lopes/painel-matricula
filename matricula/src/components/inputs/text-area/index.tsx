import React from "react";
import { TextAreaInputI } from "../utilities";
import { ContainerTextAreaBox, HeadTextAreaBox, MsgErrorFaqTexAreaBox, TextAreaBox } from "./style";


const TextBoxInput: React.FC<TextAreaInputI> = (props) => {


    return (
            <ContainerTextAreaBox>
               <HeadTextAreaBox>{props.header}</HeadTextAreaBox>
                <TextAreaBox onChange={(e) => props.setValueInput && props.setValueInput(e.target.value)} required cols={100} sWidth={props.wSize} sHeight={props.hSize} autoFocus={false} error={props.error}>{props.dValue}</TextAreaBox>
                {props.error && <MsgErrorFaqTexAreaBox>{props.msgError}</MsgErrorFaqTexAreaBox>} 
            </ContainerTextAreaBox>


    );
    /*
        required: Este atributo especifica que o usuário deve preencher um valor antes de enviar um formulário.
    */
}
export default TextBoxInput;