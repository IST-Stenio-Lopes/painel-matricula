import React from "react";
import TopLine from "../../top-line";
import Informations from "./private-informations";
import Profile from "./profile";
import './style.css';
export default function EditProfile() {


    return (

        <div>
            <TopLine name="Editar Perfil" />
            <div className="row profile">
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