import React, { useMemo, useState } from "react";
import Menu from "../menu";
import Navbar from "../navbar";
import Card from "./cards";
import { NavCompensing, PreencherCol10 } from "./style";
import Data from '../turmas/turmas.json'
import './style.css'
import DashboardTable from "./table";
import UsersTable from "./users/table";


export default function DashBoard() {

    /*     const [busca, setBusca] = useState('');
    
        const tumasFiltradas = useMemo(() => {
            const lowerBusca = busca.toLocaleLowerCase();
    
            return Data.filter((post) =>
                post.status === "Aberta"
            );
    
        }, [busca]); */

    return (
        /*  <div className="container-fluid login">
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
         </div> */

        <div className="container-fluid login">
            <div className="row login">
                <div className="col-2 ">
                    <NavCompensing status={false} />
                    <Menu />
                </div>
                <div className="col-10 ">
                    <Navbar />
                    <PreencherCol10>
                        <Card matriculadosApp={325} matriculadosUnidade={13} vagasPreenchidas={75} />
                        {/* <DashboardTable turmas={tumasFiltradas}  /> */}
                    </PreencherCol10>
                </div>
            </div>
        </div>
    );
}