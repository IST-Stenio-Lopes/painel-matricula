import React, { useMemo, useState } from "react";
import { AddButton, ImgSearch, ListContainer, Search, SearchBar, TopContainer, UlSearch } from "../../dashboard/users/style";
import { NavCompensing } from "../../home/style";
import Menu from "../../menu";
import Modal from "../../modal";
import Navbar from "../../navbar";
import { updateTurmasStatus } from "../turmas-utils/turmas-utilities";
import Data from '../turmas.json';
import TurmasTable from "./table";


export default function Turmas() {


    const [busca, setBusca] = useState('');
    const [selected, setSelected] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showChange, setShowChange] = useState(false);


    const tumasFiltradas = useMemo(() => {
        const lowerBusca = busca.toLocaleLowerCase();

        return Data.filter((post) =>
            post.curso.toLocaleLowerCase().includes(lowerBusca) || post.modalidade.toLocaleLowerCase().includes(lowerBusca)
        );

    }, [busca]);



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
                            {showChange && <Modal img={2} msg="Você tem certeza que deseja alterar o status da turma?" onClose={() => setShowChange(!showChange)} onConfirm={() => updateTurmasStatus("a")} />}
                            <SearchBar>
                                <ImgSearch />
                                <Search type="text" value={busca} onChange={(ev) => setBusca(ev.target.value)} placeholder="Pesquise o curso pelo nome ou área" onFocus={() => setSelected(true)} onBlur={() => setSelected(false)} />
                                <UlSearch>
                                    {/* {selected &&
                        usuariosFiltrados.slice(0, 8).map((user) => (
                            <LiSearch key={user.id}>{user.name}</LiSearch>
                        )
                        )
                    } */}
                                </UlSearch>
                            </SearchBar>
                            <AddButton>+ NOVA TURMA</AddButton>

                        </TopContainer>
                        <ListContainer>
                            <TurmasTable onDelete={() => setShowDelete(true)} turmas={tumasFiltradas} />
                        </ListContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

