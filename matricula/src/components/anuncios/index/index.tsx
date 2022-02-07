import React, { useState } from "react";
import { NavCompensing } from "../../dashboard/style";
import { ListContainer, TopContainer } from "../../dashboard/users/style";
import Menu from "../../menu";
import Modal from "../../modal";
import Navbar from "../../navbar";
import Data from '../anuncios.json';
import { AddAnuncio } from "./style";
import AnunciosTable from "./table";

export default function Anuncios() {

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
                            {showDelete && <Modal msg="Você tem certeza que deseja deletar a turma?" onClose={() => setShowDelete(false)} img={3} show={true} onConfirm={() => setShowDelete(false)} />}


                            <AddAnuncio>+ NOVO ANÚNCIO</AddAnuncio>

                        </TopContainer>

                        <ListContainer>
                            <AnunciosTable anuncios={Data} onDelete={() => { }} />
                        </ListContainer>
                    </div>
                </div>
            </div>
        </div>

    );
}