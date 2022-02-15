import React, { useMemo, useState } from "react";
import { NavCompensing } from "../../dashboard/style";
import { ImgSearch, ListContainer, Search, SearchBar, TopContainer, UlSearch } from "../../dashboard/users/style";
import Menu from "../../menu";
import Modal from "../../modal";
import Navbar from "../../navbar";
import MensagensTable from "./table";
import Data from '../mensagens.json';

export function Mensagens() {

    const [showDelete, setShowDelete] = useState(false);
    const [busca, setBusca] = useState('');
    const [selected, setSelected] = useState(false);

    const mensagensFiltradas = useMemo(() => {
        const lowerBusca = busca.toLocaleLowerCase();

        return Data.filter((post) =>
            post.nome.toLocaleLowerCase().includes(lowerBusca) || post.email.toLocaleLowerCase().includes(lowerBusca) || post.data.toLocaleLowerCase().includes(lowerBusca)
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
                            {showDelete && <Modal msg="Você tem certeza que deseja deletar a mensagem?" onClose={() => setShowDelete(false)} img={3} show={true} onConfirm={() => setShowDelete(false)} />}

                            <SearchBar>
                                <ImgSearch />
                                <Search type="text" value={busca} onChange={(ev) => setBusca(ev.target.value)} placeholder="Pesquise mensagem pelo nome do usuário, email ou data de envio" onFocus={() => setSelected(true)} onBlur={() => setSelected(false)} />
                                <UlSearch>

                                </UlSearch>
                            </SearchBar>
                        </TopContainer>
                        
                        <ListContainer>
                            <MensagensTable mensagens={mensagensFiltradas} onDelete={() => { }} />
                        </ListContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}