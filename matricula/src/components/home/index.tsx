import React from "react";
import Login from "../login";
import Menu from "../menu";
import Navbar from "../navbar";
import './style.css';
import { NavCompensing } from "./style";

export default function Home() {


    return (

        <div className="conteudo">
            <div className="container-fluid login">

                <div className="row login">
                    
                    <div className="col-2 ">
                        <NavCompensing/>
                        <Menu />
                        
                    </div>

                    <div className="col-10 ">
                        <Navbar/>
                    </div>

                </div>
            </div>
        </div>



    );
}