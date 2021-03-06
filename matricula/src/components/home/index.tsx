import React from "react";
import Login from "../login";
import Menu from "../menu";
import Navbar from "../navbar";
import './style.css';
import { NavCompensing } from "./style";
import StickyHeadTable from "../dashboard/turmas";
import Card from "../dashboard/cards"; // <Card matriculadosApp={10} matriculadosUnidade={50} vagasPreenchidas={86} status={true} />
import DashBoard from "../dashboard";
import EditProfile from "../dashboard/edit-profile";
import Matricula from "../matricula/index"; //<Matricula />
import UsersList from "../dashboard/users"; //<UsersList />
//<DashBoard />
import Routees from '../../routes/routes';
export default function Home() {

    return window.location.pathname === "/login" ?
        <Login /> :
        (


            <div className="container-fluid login">
                <div className="row login">
                    <div className="col-2 ">
                        <NavCompensing status={false} />
                        <Menu />
                    </div>
                    <div className="col-10 ">
                        <Navbar />
                        <Routees />
                    </div>

                </div>
            </div>
        );

}

