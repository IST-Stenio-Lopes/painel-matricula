import React, { useMemo, useState } from "react";
import CursosTable from "./table";
import Data from '../cursos.json';
import { NavCompensing } from "../../home/style";
import Menu from "../../menu";
import Navbar from "../../navbar";
import { AddButton, ImgSearch, ListContainer, Search, SearchBar, TopContainer, UlSearch } from "../../dashboard/users/style";
import Modal from "../../modal";
import { useCourse } from "../../../contexts/curso";


export default function Cursos() {

    const [busca, setBusca] = useState('');
    const [selected, setSelected] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const { stateCourse, dispatch } = useCourse();



    interface CourseSimplified {
        name: string;
        field: string;
        cost: string;
        modality: string;
        duration: string;
    }


    const cursosFiltrados = useMemo(() => {
        const lowerBusca = busca.toLocaleLowerCase();

        return Data.filter((post) =>
            post.name.toLocaleLowerCase().includes(lowerBusca) || post.field.toLocaleLowerCase().includes(lowerBusca)
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
                        <TopContainer>
                            {showDelete && <Modal msg="Você tem certeza que deseja deletar o curso?" onClose={() => setShowDelete(false)} img={3} show={true} onConfirm={() => setShowDelete(false)} />}
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
                            <AddButton onClick={() => window.location.href = "/cursos/details"}>+ NOVO CURSO</AddButton>

                        </TopContainer>

                        <button onClick={() => console.log(stateCourse)}>ver</button>
                        <ListContainer>
                            <CursosTable onDelete={() => setShowDelete(true)} cursos={cursosFiltrados} />
                        </ListContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}