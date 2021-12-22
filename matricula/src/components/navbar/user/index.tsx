import React, { Children, useEffect, useState } from "react";
import { Window, WindowSetting } from './style';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Edit from '../../../assets/dashboard-user/edit-profile.svg';
import Users from '../../../assets/dashboard-user/user-list.svg';
import Logout from '../../../assets/dashboard-user/logout.svg';
import Modal from "../../modal";




export default function User() {

    const [showExit, setShowExit] = useState<boolean>();


    return (
        <div>
            {
                (showExit && <Modal img={4} msg="Você tem certeza que deseja sair?" show={showExit} onClose={() => setShowExit(false)} />)
            }
            <Window>
                <WindowSetting>
                    <button type="button" className="btn position-relative" >
                        <div className="row">
                            <div className="col-3"><img src={Edit} width={25}></img></div>
                            <div className="col-9">Editar Perfil</div>
                        </div>
                    </button>
                </WindowSetting>
                <WindowSetting>
                    <button type="button" className="btn position-relative" >
                        <div className="row">
                            <div className="col-3"><img src={Users} width={25}></img></div>
                            <div className="col-9">Usuários</div>
                        </div>
                    </button>
                </WindowSetting>
                <WindowSetting className="last">
                    <button type="button" className="btn position-relative" onClick={() => setShowExit(true)} >
                        <div className="row">
                            <div className="col-3"><img src={Logout} width={25}></img></div>
                            <div className="col-9">Sair</div>
                        </div>
                    </button>
                </WindowSetting>
            </Window>
        </div>
    );
}