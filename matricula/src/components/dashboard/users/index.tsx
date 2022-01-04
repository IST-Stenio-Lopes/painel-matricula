import React, { useMemo, useState } from "react";
import { AddButton, ImgSearch, LiSearch, ListContainer, Search, SearchBar, TopContainer, UlSearch } from "./style";
import Data from './mock-data.json';
import UsersTable from "./table";

// import search from '../../../assets/search.svg';


export default function UsersList() {
    const [busca, setBusca] = useState('');
    const [selected, setSelected] = useState(false);
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
        <div>
            <TopContainer>
                <SearchBar>
                    <ImgSearch />
                    <Search type="text" value={busca} onChange={(ev) => setBusca(ev.target.value)} placeholder="Digite o nome do usuário" onFocus={() => setSelected(true)} onBlur={() => setSelected(false)} />
                    <UlSearch>
                        {selected &&
                            usuariosFiltrados.slice(0, 8).map((user) => (
                                <LiSearch key={user.id}>{user.name}</LiSearch>

                            )

                            )
                        }
                    </UlSearch>
                </SearchBar>
                <AddButton>+ NOVO USUÁRIO</AddButton>

            </TopContainer>


            <ListContainer>
                <UsersTable />
            </ListContainer>



        </div>
    );

}