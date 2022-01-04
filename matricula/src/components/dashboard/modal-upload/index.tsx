import React from "react";
import { ModalUploadItens } from "../../../utils/utilities";
import { ContainerModalSubmit, DescriptionMS, ModalUploadContainer, MsgMS } from "./style";
import Clip from '../../../assets/clip.svg';
//import Previews from './dropZone/index.js';<Previews />
//import DropZone from "./dropZone";<DropZone />


const ModalUpload: React.FC<ModalUploadItens> = ({ img, msg, onClose }) => {


    return (
        <ModalUploadContainer>
            <div>
                <div className="position-relative">
                    <div className="position-absolute top-0 end-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16" onClick={() => onClose()}>
                            <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                            <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                        </svg>
                    </div>
                </div>
                <ContainerModalSubmit>
                    <img width={80} src={Clip} />
                    <MsgMS>{msg}</MsgMS>
                    <DescriptionMS>Arraste e jogue na caixa abaixo ou clique em procurar</DescriptionMS>
                </ContainerModalSubmit>

                <input type="file" id="file" name="file"></input>
            </div>

        </ModalUploadContainer>
    );
}
export default ModalUpload;