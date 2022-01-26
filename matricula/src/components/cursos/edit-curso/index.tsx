import React, { useState, useEffect, useRef } from "react";
import { ConteudoProgramaticoI } from "../../../utils/utilities";
import { NavCompensing } from "../../home/style";
import Money from "../../inputs/money";
import NormalInput from "../../inputs/normal";
import Select from "../../inputs/select";
import Tags from "../../inputs/tags";
import Menu from "../../menu";
import Navbar from "../../navbar";
import TopLine from "../../top-line";
import { /*AlignCenterSec3,*/ BottomLineCurso, /*ButtonAddListSec3, CompleteSpaceSec3, */ConteudoFormCurso, ConteudoSec1FormCurso, ConteudoSec1FormCursoDividido, ConteudoSec2FormCurso, ConteudoSec3FormCurso, HeadFormCurso, AlignSec3,/* LineListSec3,*/ PrincipalDivEditCurso, SubTitleHeadFormCurso, TextBoxContainer, TextBoxCurso, TextBoxSec3, TextBoxSec3Detail, TextBoxTitle, TitleHeadFormCurso, InputSec3Name, InputSec3Hours, ButtonAddListSec3, ConteudoProgramaticoSec3, HoursSec3, LixeiraImgSec3, ButtonSaveFooterCurso } from "./style";
import Trash from '../../../assets/trash.svg';
import Modal from "../../modal";
//<TopLine name="Editar Curso"/>

export default function EditCurso() {
    /* const descriptionRef = useRef<HTMLInputElement>(null);
    const hoursRef = useRef<HTMLInputElement>(null); */

    const [conteudoP, setConteudoP] = useState<ConteudoProgramaticoI[]>([]);
    const [conteudo, setConteudo] = useState<ConteudoProgramaticoI>({ id: 0, description: "", hours: NaN });
    const [showSave, setShowSave] = useState(false);



    function addConteudo() {


        const updateConteudoP = [...conteudoP, conteudo];
        setConteudoP(updateConteudoP);



        console.log(conteudoP);
        setConteudo({ description: "", hours: NaN });

    }

    function removeConteudo(id: number | undefined) {
        /*var result = conteudoP.filter(function (el) {
            return el.id == id;
        });
        for (var elemento of result){
            var index = conteudoP.indexOf(elemento);
            conteudoP.splice(index, 1);
        }*/
        console.log("entrou na função")
        var clone = conteudoP;
        for (var i = 0, j = clone.length; i !== j; i++) {
            if (clone[i].id === id) break;
        }
        clone.splice(i, 1);
        console.log("chegou aqui");
        setConteudoP(clone);
    }

    /* useEffect(() => {
        addConteudo();
    }, []) */


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
                        <TopLine name="Editar Curso" />
                        {showSave && <Modal msg="Você tem certeza que deseja salvar as informações?" onClose={() => setShowSave(false)} img={5} show={true} onConfirm={() => setShowSave(false)} />}
                        <PrincipalDivEditCurso>
                            <HeadFormCurso>
                                <TitleHeadFormCurso>Informações do Curso</TitleHeadFormCurso>
                                <SubTitleHeadFormCurso>Estas informações serão exibidas no aplicativo para o usuário</SubTitleHeadFormCurso>
                            </HeadFormCurso>
                            <ConteudoFormCurso className="row">
                                <ConteudoSec1FormCurso className="col-4">
                                    <NormalInput title="Nome" size={window.screen.width < 1600 ? 25 : 38} />
                                    <Select options={["Alimentos", "Mecânica", "Matrizaria", "Eletrica", "Construção"]} title="Área" size={window.screen.width < 1600 ? 13 : 15} />
                                    <Select options={["Iniciação", "Técnico", "Capacitação", "Superior", "Aperfeiçoamento"]} title="Modalidade" size={window.screen.width < 1600 ? 13 : 15} />
                                    <Tags />
                                    <NormalInput title="Duração" size={window.screen.width < 1600 ? 13 : 15} />

                                    <ConteudoSec1FormCursoDividido className="row">
                                        <div className="col-6">
                                            <Money size={window.screen.width < 1600 ? 13 : 15} title="Valor do curso" />
                                        </div>
                                        <div className="col-6">
                                            <NormalInput title="Parcelas" size={window.screen.width < 1600 ? 13 : 15} />
                                        </div>
                                    </ConteudoSec1FormCursoDividido>
                                    <Money title="Taxa de Matricula" size={window.screen.width < 1600 ? 13 : 15} />



                                </ConteudoSec1FormCurso>

                                <ConteudoSec2FormCurso className="col-4">
                                    <TextBoxContainer>
                                        <TextBoxTitle>Descrição</TextBoxTitle>
                                        <TextBoxCurso />
                                    </TextBoxContainer>

                                    <TextBoxContainer>
                                        <TextBoxTitle>Pré Requisitos</TextBoxTitle>
                                        <TextBoxCurso />
                                    </TextBoxContainer>
                                </ConteudoSec2FormCurso>

                                <ConteudoSec3FormCurso className="col-4">

                                    <AlignSec3>
                                        <TextBoxSec3>Conteúdo Programático</TextBoxSec3>
                                        <TextBoxSec3Detail>Horas</TextBoxSec3Detail>
                                    </AlignSec3>

                                    {
                                        conteudoP.map((post) => {
                                            return (
                                                <AlignSec3 key={post.description} >
                                                    <ConteudoProgramaticoSec3>{post.description}</ConteudoProgramaticoSec3>
                                                    <HoursSec3>{post.hours}</HoursSec3>
                                                    <LixeiraImgSec3 src={Trash} onClick={() => removeConteudo(post.id)} />

                                                </AlignSec3>
                                            )
                                        })
                                    }

                                    <form onSubmit={() => addConteudo()}>
                                        <AlignSec3>
                                            {
                                                /* <InputSec3Name value={conteudo.description} onChange={(e) => {
                                                    const { hours } = conteudo;
                                                    setConteudo({ description: e.target.value, hours: hours });
                                                    console.log(e.target.value);
                                                    console.log(conteudo);
                                                }} />
                                                <InputSec3Hours value={conteudo.hours} /> */

                                            }
                                            <InputSec3Name type="text" onChange={(e) => {

                                                const { hours } = conteudo;
                                                setConteudo({ description: e.target.value, hours: hours });
                                                console.log(conteudo.description)
                                            }}
                                                value={conteudo.description}
                                            />
                                            <InputSec3Hours type="number" onChange={(e) => {

                                                const { description } = conteudo;
                                                setConteudo({ id: conteudoP.length + 1, description: description, hours: e.target.valueAsNumber });
                                                console.log(conteudo)
                                            }}
                                                value={conteudo.hours}
                                            />

                                        </AlignSec3>

                                    </form>
                                    <ButtonAddListSec3 onClick={() => addConteudo()}>+ Adicionar</ButtonAddListSec3>
                                </ConteudoSec3FormCurso>

                            </ConteudoFormCurso>


                            <BottomLineCurso>
                                <ButtonSaveFooterCurso onClick={() => setShowSave(true)}>SALVAR</ButtonSaveFooterCurso>
                            </BottomLineCurso>

                        </PrincipalDivEditCurso>
                    </div>
                </div>
            </div>
        </div>



    );
}