import React, { Children, useEffect, useState } from "react";
import { ModalItens } from "../../utils/utilities";
import { ModalContainer, Msg, ImgModal, Anc, Btn } from './style';
import { GetModalImage } from "../../utils/utilities";

const Modal: React.FC<ModalItens> = ({ img, msg, onClose, show }) => {



    return (

        <ModalContainer>

            <div>

                <ImgModal src={GetModalImage(img)} />
                <Msg>{msg}</Msg>


                <div className="row">
                    <div className="col-6">

                        <Btn onClick={() => onClose()}>NÃO</Btn>
                    </div>
                    <div className="col-6">
                        <Btn change={true} onClick={() => onClose()}>SIM</Btn>
                    </div>
                </div>

            </div>
        </ModalContainer>


    );

}
export default Modal;