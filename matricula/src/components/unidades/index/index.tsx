import React, { useState } from "react";
import { NavCompensing } from "../../dashboard/style";
import { ListContainer, TopContainer } from "../../dashboard/users/style";
import Menu from "../../menu";
import Modal from "../../modal";
import Navbar from "../../navbar";
import Data from '../unidades.json';
import { AddUnidade } from "./style";
import TableUnidades from "./table";

export default function Unidades() {
    const [showDelete, setShowDelete] = useState(false);


    return (
    <div className="container-fluid login">
            <div className="row login">
                <div className="col-2 ">
                    <NavCompensing status={false} />
                    <Menu />
                </div>
                <div className="col-10 ">
                    <Navbar />
                    <div>
                        <TopContainer>
                            {showDelete && <Modal msg="Você tem certeza que deseja deletar a unidade?" onClose={() => setShowDelete(false)} img={3} show={true} onConfirm={() => setShowDelete(false)} />}


                            <AddUnidade>+ NOVA UNIDADE</AddUnidade>

                        </TopContainer>

                        <ListContainer>
                            <TableUnidades unidades={Data} onDelete={() => { }} />
                        </ListContainer>
                    </div>
                </div>
            </div>
        </div>
        
    );
}