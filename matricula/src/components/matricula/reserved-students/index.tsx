import React, { useMemo, useState } from "react";
import { ImgSearch, ListContainer, Search, SearchBar, UlSearch } from "../../dashboard/users/style";
import { NavCompensing } from "../../home/style";
import Menu from "../../menu";
import Modal from "../../modal";
import Navbar from "../../navbar";
import TopLine from "../../top-line";
import { TopContainerMatriculaIndex } from "../index/style";
import Data from './reserved-students.json';
import ReservedStudentTable from "./table";

export default function ReservedStudents() {

    const [busca, setBusca] = useState('');
    const [selected, setSelected] = useState(false);
    const [showDelete, setShowDelete] = useState(false);


    const usuariosFiltrados = useMemo(() => {
        const lowerBusca = busca.toLocaleLowerCase();

        return Data.filter((post) =>
            post.nome.toLocaleLowerCase().includes(lowerBusca)
        );


    }, [busca])


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
                        {showDelete && <Modal msg="Você tem certeza que deseja deletar este usuário?" onClose={() => setShowDelete(false)} img={3} show={true}/>}
                        <TopLine name="Reservados" />
                        <ListContainer>
                            <ReservedStudentTable onDelete={() => setShowDelete(true)} estudantes={Data} />
                        </ListContainer>

                    </div>
                </div>
            </div>
        </div>

    );

}