import React from "react";

import { NavCompensing, PreencherCol10 } from "../../../dashboard/style";
import NormalInput from "../../../inputs/normal";
import Select from "../../../inputs/select";
import { HeadFormMatricula, SubTitleHeadFormMatricula, TitleHeadFormMatricula } from "../../../matricula/edit-student/style";
import Menu from "../../../menu";
import Navbar from "../../../navbar";
import TopLine from "../../../top-line";
import { ConteudoDivFaq, PrincipalDivFaq } from "./style";

interface SendObjectFaq {
    id?: string,
    title: string,
    category: string,
    content: string
}
interface data {
    o?: SendObjectFaq;
}


export const EditFaq: React.FC<data> = ({ o }) => {

    return (
        <div className="container-fluid login">
            {/* o && !o.id && <h1>Teste</h1> */}
            <div className="row login">
                <div className="col-2 ">
                    <NavCompensing status={false} />
                    <Menu />
                </div>
                <div className="col-10 ">
                    <Navbar />
                    <TopLine name="Novo Tópico" />
                    {/* <button onClick={() => { console.log(o) }}>test</button> */}
                    <PrincipalDivFaq>
                        <HeadFormMatricula>
                            <TitleHeadFormMatricula>
                                FAQ
                            </TitleHeadFormMatricula>
                            <SubTitleHeadFormMatricula>
                                Estas informações serão apresentadas no aplicativo
                            </SubTitleHeadFormMatricula>
                        </HeadFormMatricula>
                        <ConteudoDivFaq>
                            <form>
                                <NormalInput title="Tópico" size={35} error={false} msgErro={"teste"} dValue={o?.title} />
                                <Select title="" size={25} defaultValue={o ? o.category : ''} options={["Pagamentos", "Sobre o SENAI", "EAD", "Descontos", "Cursos", "Matriculas"]} />
                                <label>Texto</label>
                                <textarea id="story" name="story" rows={12} cols={5}>

                                </textarea>
                            </form>
                        </ConteudoDivFaq>
                    </PrincipalDivFaq>
                </div>
            </div>
        </div>

    );
}
export default EditFaq;