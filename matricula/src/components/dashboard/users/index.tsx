import React, { useMemo, useState } from "react";
import { AddButton, ImgSearch, LiSearch, ListContainer, Search, SearchBar, TopContainer, UlSearch } from "./style";
import Data from './users.json';
import UsersTable from "./table";
import Modal from '../../modal/index';
import Menu from "../../menu";
import Navbar from "../../navbar";
import { NavCompensing } from "../style";


// import search from '../../../assets/search.svg';


export default function UsersList() {
    const [busca, setBusca] = useState('');
    const [selected, setSelected] = useState(false);
    const [showDelete, setShowDelete] = useState(false);


    /*{usuariosFiltrados.map((user) => (
                        <LiSearch key={user.name}>{user.name}</LiSearch>
                    )

                    )}*/

    const usuariosFiltrados = useMemo(() => {
        const lowerBusca = busca.toLocaleLowerCase();

        return Data.filter((post) =>
            post.name.toLocaleLowerCase().includes(lowerBusca)
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
                            {showDelete && <Modal msg="Você tem certeza que deseja deletar este usuário?" onClose={() => setShowDelete(false)} img={3} show={true} onConfirm={() => setShowDelete(false)} />}
                            <SearchBar>
                                <ImgSearch />
                                <Search type="text" value={busca} onChange={(ev) => setBusca(ev.target.value)} placeholder="Digite o nome do usuário" onFocus={() => setSelected(true)} onBlur={() => setSelected(false)} />
                                <UlSearch>
                                    {/* {selected &&
                            usuariosFiltrados.slice(0, 8).map((user) => (
                                <LiSearch key={user.id}>{user.name}</LiSearch>
                            )
                            )
                        } */}
                                </UlSearch>
                            </SearchBar>
                            <AddButton ><a href="http://localhost:3000/dashboard/edit">+ NOVO USUÁRIO</a></AddButton>

                        </TopContainer>


                        <ListContainer>
                            <UsersTable onDelete={() => setShowDelete(true)} usuarios={usuariosFiltrados} />
                        </ListContainer>
                    </div>
                </div>
            </div>
        </div>


    );

}