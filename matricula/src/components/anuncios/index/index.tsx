import React, { useMemo, useState } from "react";
import { NavCompensing } from "../../dashboard/style";
import { ImgSearch, ListContainer, Search, SearchBar, TopContainer, UlSearch} from "../../dashboard/users/style";
import Menu from "../../menu";
import Modal from "../../modal";
import Navbar from "../../navbar";
import Data from '../anuncios.json';
import { AddAnuncio } from "./style";
import AnunciosTable from "./table";

export default function Anuncios() {

    const [busca, setBusca] = useState('');
    const [selected, setSelected] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showChange, setShowChange] = useState(false);


    const anunciosFiltrados = useMemo(() => {
        const lowerBusca = busca.toLocaleLowerCase();

        return Data.filter((post) =>
            post.titulo.toLocaleLowerCase().includes(lowerBusca) || post.texto.toLocaleLowerCase().includes(lowerBusca)
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

                            <SearchBar>
                                <ImgSearch />
                                <Search type="text" value={busca} onChange={(ev) => setBusca(ev.target.value)} placeholder="Pesquise o anuncio pelo titulo ou texto" onFocus={() => setSelected(true)} onBlur={() => setSelected(false)} />
                                <UlSearch>
                                </UlSearch>
                            </SearchBar>

                            <AddAnuncio>+ NOVO ANÚNCIO</AddAnuncio>

                        </TopContainer>

                        <ListContainer>
                            <AnunciosTable anuncios={anunciosFiltrados} onDelete={() => { }} />
                        </ListContainer>
                    </div>
                </div>
            </div>
        </div>

    );
}