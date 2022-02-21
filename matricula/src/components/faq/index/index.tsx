import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { FaqActions, useFaq } from "../../../contexts/faq";
import api from "../../../services/api";
import { NavCompensing } from "../../dashboard/style";
import { ImgSearch, ListContainer, Search, SearchBar, TopContainer, UlSearch } from "../../dashboard/users/style";
import { AddButton } from "../../matricula/index/style";
import Menu from "../../menu";
import Modal from "../../modal";
import Navbar from "../../navbar";
import Data from '../faq.json';
import EditFaq from "./edit-faq";
import { AddFaq } from "./style";
import FaqTable from "./table";

export function Faq() {

    const [showDelete, setShowDelete] = useState(false);
    let navigate = useNavigate();
    const [busca, setBusca] = useState('');
    const [selected, setSelected] = useState(false);
    const { stateFaq, dispatch } = useFaq();
    const [dataFaq, setDataFaq] = useState<DataFaq[]>(); //Array de Faq que será passado pelo backend

    interface DataFaq {
        title: string;
        category: string;
        content: string;
        created_at: Date;
    }



    const FaqFiltrados = useMemo(() => {
        const lowerBusca = busca.toLocaleLowerCase();

        return Data.filter((post) =>
            post.topico.toLocaleLowerCase().includes(lowerBusca) || post.categoria.toLocaleLowerCase().includes(lowerBusca)
        );

    }, [busca]);


    useEffect(() => {
        api
            .get(`/faq/`, { params: { page: 1 } })
            .then((response) => setDataFaq(response.data))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);





    const handleFaqClear = (reset: boolean) => {
        dispatch({
            type: FaqActions.reset,
            payload: reset
        });

    }
    function GoToEditFaq() {
        return (
            /*  <Routes>
                 <Route path="edit" element={<EditFaq o={stateFaq} />} />
             </Routes> */
            <Link to="edit" />
        );
    }


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
                                <Search type="text" value={busca} onChange={(ev) => setBusca(ev.target.value)} placeholder="Pesquise a questão pelo tópico ou categoria" onFocus={() => setSelected(true)} onBlur={() => setSelected(false)} />
                                <UlSearch>

                                </UlSearch>
                            </SearchBar>

                            <AddFaq onClick={() => { handleFaqClear(true); navigate('edit') }} >NOVO TÓPICO</AddFaq>
                            {/*<button onClick={() => { console.log(stateFaq) }}>test</button> */}

                        </TopContainer>

                        <ListContainer>
                            <FaqTable faqs={FaqFiltrados} onDelete={() => { }} />
                        </ListContainer>
                    </div>
                </div>
            </div>
        </div>

    );
}