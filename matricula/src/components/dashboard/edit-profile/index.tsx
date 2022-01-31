import React, { useState } from "react";
import TopLine from "../../top-line";
import Informations from "./private-informations";
import Profile from "./profile";
import './style.css';
import ModalUpload from "../modal-upload";
import Navbar from "../../navbar";
import Menu from "../../menu";
import { NavCompensing } from "../../home/style";
import { PreencherCol10 } from "../style";

export default function EditProfile() {
    const [showExit, setShowExit] = useState<boolean>(false);

    return (

        <div className="row login">
            <div className="col-2 ">
                <NavCompensing status={false} />
                <Menu />
            </div>
            <div className="col-10 ">
                <Navbar />
                <PreencherCol10>
                <TopLine name="Editar Perfil" />
                    <div className="row profile">
                        {showExit && <ModalUpload msg="Carregue sua foto" show={showExit} onClose={() => setShowExit(false)} />}

                        <div className="col-3">
                            <Profile nome="Laura Pradella" cargo="Diretora" foto="LP" />
                        </div>
                        <div className="col-9">
                            <Informations />
                        </div>
                    </div>
                </PreencherCol10>
   
                   
            </div>
        </div>



    );
}