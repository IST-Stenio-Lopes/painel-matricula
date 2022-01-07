import React from "react";
import Menu from "../menu";
import Navbar from "../navbar";
import Card from "./cards";
import { NavCompensing } from "./style";

import './style.css'


export default function DashBoard() {
    return (
        <div className="container-fluid login">
            <div className="row login">
                <div className="col-2 ">
                    <NavCompensing status={false} />
                    <Menu />
                </div>
                <div className="col-10 ">
                    <Navbar />
                    <Card matriculadosApp={325} matriculadosUnidade={13} vagasPreenchidas={75} />
                </div>
            </div>
        </div>
    );
}