import React, { useState } from "react";
import { NavCompensing } from "../../dashboard/style";
import { ListContainer, TopContainer } from "../../dashboard/users/style";
import Menu from "../../menu";
import Modal from "../../modal";
import Navbar from "../../navbar";
import FaqTable from "./table";
import Data from '../faq.json';

export function Faq() {

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
                            {showDelete && <Modal msg="Você tem certeza que deseja deletar o tópico?" onClose={() => setShowDelete(false)} img={3} show={true} onConfirm={() => setShowDelete(false)} />}

                        </TopContainer>

                        <ListContainer>
                            <FaqTable faqs={Data} onDelete={() => { }} />
                        </ListContainer>
                    </div>
                </div>
            </div>
        </div>

    );
}