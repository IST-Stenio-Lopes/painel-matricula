import React, { useMemo, useState } from "react";
import { ImgSearch, LiSearch, ListContainer, Search, SearchBar, TopContainer, UlSearch } from "../../dashboard/users/style";
import { NavCompensing } from "../../home/style";
import Menu from "../../menu";
import Modal from "../../modal";
import Navbar from "../../navbar";
import Data from '../mock-data.json';
import { AddButton, ReservedButton, TopContainerMatriculaIndex } from "./style";
import StudentsTable from './table';


export default function Matricula() {

    const [busca, setBusca] = useState('');
    const [selected, setSelected] = useState(false);
    const [showDelete, setShowDelete] = useState(false);


    const usuariosFiltrados = useMemo(() => {
        const lowerBusca = busca.toLocaleLowerCase();

        return Data.filter((post) =>
            post.nome.toLocaleLowerCase().includes(lowerBusca) || post.cpf.includes(lowerBusca)
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
                        {showDelete && <Modal msg="Você tem certeza que deseja deletar este usuário?" onClose={() => setShowDelete(false)} img={3} show={true} onConfirm={() => setShowDelete(false)} />}
                        <TopContainerMatriculaIndex>
                            <SearchBar>
                                <ImgSearch />
                                <Search type="text" value={busca} onChange={(ev) => setBusca(ev.target.value)} placeholder="Pesquise o Aluno pelo nome ou CPF" onFocus={() => setSelected(true)} onBlur={() => setSelected(false)} />
                                <UlSearch>
                                </UlSearch>
                            </SearchBar>

                            <ReservedButton onClick={() => { window.location.href = "/matricula/reserved" }}>RESERVADOS</ReservedButton>

                            <AddButton onClick={() => { window.location.href = "/matricula/edit" }}>+ NOVO ALUNO</AddButton>
                        </TopContainerMatriculaIndex>
                        <ListContainer>
                            <StudentsTable onDelete={() => setShowDelete(true)} estudantes={usuariosFiltrados} />
                        </ListContainer>

                    </div>
                </div>
            </div>
        </div>

    );
}