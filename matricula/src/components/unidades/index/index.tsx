import React, { useMemo, useState } from "react";
import { NavCompensing } from "../../dashboard/style";
import { ImgSearch, ListContainer, Search, SearchBar, TopContainer, UlSearch } from "../../dashboard/users/style";
import Menu from "../../menu";
import Modal from "../../modal";
import Navbar from "../../navbar";
import Data from '../unidades.json';
import { AddUnidade } from "./style";
import TableUnidades from "./table";

export default function Unidades() {
    const [showDelete, setShowDelete] = useState(false);
    const [busca, setBusca] = useState('');
    const [selected, setSelected] = useState(false);
    const [showChange, setShowChange] = useState(false);


    const unidadesFiltradas = useMemo(() => {
        const lowerBusca = busca.toLocaleLowerCase();

        return Data.filter((post) =>
            post.nome.toLocaleLowerCase().includes(lowerBusca) || post.cep.toLocaleLowerCase().includes(lowerBusca)
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
                            {showDelete && <Modal msg="Você tem certeza que deseja deletar a unidade?" onClose={() => setShowDelete(false)} img={3} show={true} onConfirm={() => setShowDelete(false)} />}

                            <SearchBar>
                                <ImgSearch />
                                <Search type="text" value={busca} onChange={(ev) => setBusca(ev.target.value)} placeholder="Pesquise o anuncio pelo titulo ou texto" onFocus={() => setSelected(true)} onBlur={() => setSelected(false)} />
                                <UlSearch>
                                </UlSearch>
                            </SearchBar>

                            <AddUnidade>+ NOVA UNIDADE</AddUnidade>

                        </TopContainer>

                        <ListContainer>
                            <TableUnidades unidades={unidadesFiltradas} onDelete={() => { }} />
                        </ListContainer>
                    </div>
                </div>
            </div>
        </div>

    );
}