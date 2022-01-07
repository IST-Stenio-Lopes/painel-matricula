import React, { useState } from "react";
import TopLine from "../../top-line";
import Informations from "./private-informations";
import Profile from "./profile";
import './style.css';
import ModalUpload from "../modal-upload";

export default function EditProfile() {
    const [showExit, setShowExit] = useState<boolean>(false);

    return (

        <div>
            <TopLine name="Editar Perfil" />
            <div className="row profile">
                {showExit && <ModalUpload msg="Carregue sua foto" show={showExit} onClose={() => setShowExit(false)} />}

                <div className="col-3">
                    <Profile />
                </div>
                <div className="col-9">
                    <Informations />
                </div>
            </div>
        </div>
    );
}