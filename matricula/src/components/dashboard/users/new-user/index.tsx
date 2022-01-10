import React, { useState } from "react";
import Menu from "../../../menu";
import Navbar from "../../../navbar";
import TopLine from "../../../top-line";
import Informations from "../../edit-profile/private-informations";
import Profile from "../../edit-profile/profile";
import { NavCompensing } from "../../style";
import { NewUserFlexBox } from "./style";





export default function NewUser() {
    const [showExit, setShowExit] = useState<boolean>(false);
    //<TopLine name="Novo Usuário" />
    return (
        <div className="container-fluid login">
            <div className="row login">
                <div className="col-2 ">
                    <NavCompensing status={false} />
                    <Menu />
                </div>
                <div className="col-10 ">
                    <Navbar />
                    <TopLine name="Novo Usuário" />
                    <NewUserFlexBox>
                        <Profile nome="" foto="" cargo="" />
                        <Informations />
                    </NewUserFlexBox>

                </div>
            </div>
        </div>
    );
}