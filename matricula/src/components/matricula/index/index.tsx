import React, { useMemo, useState } from "react";
import { ImgSearch, LiSearch, Search, SearchBar, TopContainer, UlSearch } from "../../dashboard/users/style";
import Data from '../mock-data.json';
import { AddButton, ReservedButton, TopContainerMatriculaIndex } from "./style";



export default function Matricula() {

    const [busca, setBusca] = useState('');
    const [selected, setSelected] = useState(false);


    const usuariosFiltrados = useMemo(() => {
        const lowerBusca = busca.toLocaleLowerCase();

        return Data.filter((post) =>
            post.nome.toLocaleLowerCase().includes(lowerBusca)
        );

    }, [busca])


    return (
        <div>
            <TopContainerMatriculaIndex>
                <SearchBar>
                    <ImgSearch />
                    <Search type="text" value={busca} onChange={(ev) => setBusca(ev.target.value)} placeholder="Digite o nome do usuário" onFocus={() => setSelected(true)} onBlur={() => setSelected(false)} />
                    <UlSearch>
                        {selected &&
                            usuariosFiltrados.slice(0, 8).map((user) => (
                                <LiSearch key={user.id}>{user.nome} {user.curso}</LiSearch>

                            )

                            )
                        }
                    </UlSearch>
                </SearchBar>

                <ReservedButton>RESERVADOS</ReservedButton>

                <AddButton>+ NOVO ALUNO</AddButton>
            </TopContainerMatriculaIndex>








        </div>
    );
}