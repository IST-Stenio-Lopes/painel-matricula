import React from "react";
import Login from "../login";
import Menu from "../menu";
import './style.css';

export default function Home() {


    return (

        <div className="conteudo">
            <div className="container-fluid login">

                <div className="row login">

                    <div className="col-2 ">
                        <Menu />

                    </div>

                    <div className="col-10 ">

                    </div>

                </div>
            </div>
        </div>



    );
}