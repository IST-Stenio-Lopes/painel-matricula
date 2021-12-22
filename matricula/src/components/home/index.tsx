import React from "react";
import Login from "../login";
import Menu from "../menu";
import Navbar from "../navbar";
import './style.css';
import { NavCompensing } from "./style";
import StickyHeadTable from "../dashboard/turmas";
import Card from "../dashboard/cards";
import DashBoard from "../dashboard";
import EditProfile from "../dashboard/edit-profile";
//<DashBoard />
export default function Home() {


    return (
        <div className="container-fluid login">
            <div className="row login">
                <div className="col-2 ">
                    <NavCompensing status={false} />
                    <Menu />
                </div>
                <div className="col-10 ">
                    <Navbar />
                    <EditProfile />
                </div>

            </div>
        </div>
    );
}