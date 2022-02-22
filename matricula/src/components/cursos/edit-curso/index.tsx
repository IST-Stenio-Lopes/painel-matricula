import React, { useEffect, useRef, useState } from "react";

import Trash from '../../../assets/trash.svg';
import { useCourse } from "../../../contexts/curso";
import { ConteudoProgramaticoI } from "../../../utils/utilities";
import { NavCompensing } from "../../home/style";
import Money from "../../inputs/money";
import NormalInput from "../../inputs/normal";
import Select from "../../inputs/select";
import Tags from "../../inputs/tags";
import Menu from "../../menu";
import Modal from "../../modal";
import Navbar from "../../navbar";
import TopLine from "../../top-line";
import { AlignSec3, BottomLineCurso, ButtonAddListSec3, ButtonSaveFooterCurso, ConteudoFormCurso, ConteudoProgramaticoSec3, ConteudoSec1FormCurso, ConteudoSec1FormCursoDividido, ConteudoSec2FormCurso, ConteudoSec3FormCurso, HeadFormCurso, HoursSec3, InputSec3Hours, InputSec3Name, LixeiraImgSec3, PrincipalDivEditCurso, SubTitleHeadFormCurso, TextBoxContainer, TextBoxCurso, TextBoxSec3, TextBoxSec3Detail, TextBoxTitle, TitleHeadFormCurso } from "./style";
import { Tag } from 'react-tag-input';
import TextBoxInput from "../../inputs/text-area";
//<TopLine name="Editar Curso"/>



interface CourseContent {
    title: string;
    credits: number;
}
interface SendObjectCourse {
    id?: string,
    name: string,
    field: string,
    cost: number,
    modality: string,
    tags: Tag[],
    duration: string,
    payment_installment: number,
    enrolment_fee: number,
    description: string,
    prerequisites: string,
    grade: CourseContent[]
}

interface data {
    o?: SendObjectCourse;
}

export const EditCurso: React.FC<data> = ({ o }) => {
    /* const descriptionRef = useRef<HTMLInputElement>(null);
    const hoursRef = useRef<HTMLInputElement>(null); */

    const [conteudoP, setConteudoP] = useState<ConteudoProgramaticoI[]>([]);
    const [conteudo, setConteudo] = useState<ConteudoProgramaticoI>({ id: 0, description: "", hours: NaN });
    const [showSave, setShowSave] = useState(false);
    const { stateCourse, dispatch } = useCourse();
    const [valueInputCourseName, setValueInputCourseName] = useState('');
    const [valueInputCourseField, setValueInputCourseField] = useState('Área');
    const [valueInputCourseModality, setValueInputCourseModality] = useState('Modalidade');
    const [valueInputCourseDuration, setValueInputCourseDuration] = useState('');
    const [valueInputCourseCost, setValueInputCourseCost] = useState<number>();
    const [valueInputCoursePayment_installment, setValueInputPayment_installment] = useState<number>();
    const [valueInputEnrolment_fee, setValueInputEnrolment_fee] = useState<number>();
    const [valueInputCourseDescription, setValueInputCourseDescription] = useState('');
    const [valueInputCoursePrerequisites, setValueInputCoursePrerequisites] = useState('');
    const [valueInputCourseGrade, setValueInputCourseGrade] = useState<CourseContent[]>();
    //
    const [errorInputCourseName, setErrorInputCourseName] = useState(false);
    const [errorInputCourseField, setErrorInputCourseField] = useState(false);
    const [errorInputCourseModality, setErrorInputCourseModality] = useState(false);
    const [errorInputCourseDuration, setErrorInputCourseDuration] = useState(false);
    const [errorInputCourseCost, setErrorInputCourseCost] = useState(false);
    const [errorInputCoursePayment_installment, setErrorInputPayment_installment] = useState(false);
    const [errorInputEnrolment_fee, setErrorInputEnrolment_fee] = useState(false);
    const [errorInputCourseDescription, setErrorInputCourseDescription] = useState(false);
    const [errorInputCoursePrerequisites, setErrorInputCoursePrerequisites] = useState(false);
    const [errorInputCourseGrade, setErrorInputCourseGrade] = useState(false);

    const [tags, setTags] = useState<Tag[]>([]);
    const [errorInputCourseTag, setErrorInputCourseTag] = useState(false);

    useEffect(() => {
        (o?.name && setValueInputCourseName(o?.name));
        (o?.field && setValueInputCourseField(o?.field));
        (o?.modality && setValueInputCourseModality(o?.modality));
        (o?.tags && setTags(o?.tags));
        (o?.duration && setValueInputCourseDuration(o?.duration));
        (o?.cost && setValueInputCourseCost(o?.cost));
        (o?.payment_installment && setValueInputPayment_installment(o?.payment_installment));
        (o?.enrolment_fee && setValueInputEnrolment_fee(o?.enrolment_fee));
        (o?.description && setValueInputCourseDescription(o?.description));
        (o?.prerequisites && setValueInputCoursePrerequisites(o?.prerequisites));
        (o?.grade && setValueInputCourseGrade(o?.grade));
    }, [])

    function SendObjectCourse() {
        setErrorInputCourseName(false);
        setErrorInputCourseField(false);
        setErrorInputCourseModality(false);
        setErrorInputCourseTag(false);
        setErrorInputCourseDuration(false);
        setErrorInputCourseCost(false);
        setErrorInputPayment_installment(false);
        setErrorInputEnrolment_fee(false);
        setErrorInputCourseDescription(false);
        setErrorInputCoursePrerequisites(false);
        setErrorInputCourseGrade(false);

        if (valueInputCourseName === "") {
            setErrorInputCourseName(true);
        }
        else if (valueInputCourseField === "") {
            setErrorInputCourseField(true);
        }
        else if (valueInputCourseModality === "") {
            setErrorInputCourseModality(true);
        }
        else if (tags.length < 2) {
            alert("Devem ser adicionadas ao menos duas Tags!");
        }
        else if (valueInputCourseDuration === "") {
            setErrorInputCourseDuration(true);
        }
        else if (valueInputCourseCost == undefined || valueInputCourseCost <= 0) {
            setErrorInputCourseCost(true);
        }
        else if (valueInputCoursePayment_installment == undefined ||  valueInputCoursePayment_installment <= 0) {
            setErrorInputPayment_installment(true);
        }
        else if (valueInputEnrolment_fee == undefined) {
            setErrorInputEnrolment_fee(true);
        }
        else if (valueInputCourseDescription === "") {
            setErrorInputCourseDescription(true);
        }
        else if (valueInputCoursePrerequisites === "") {
            setErrorInputCoursePrerequisites(true);
        }
        else if (valueInputCourseGrade && valueInputCourseGrade.length <= 0) {
            setErrorInputCourseGrade(true);
        }
        else {
            setShowSave(true);
        }

    }

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
        alert("entrou na função")
        var clone = conteudoP;
        for (var i = 0, j = clone.length; i !== j; i++) {
            if (clone[i].id === id) break;
        }
        clone.splice(i, 1);
        alert("chegou aqui");
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
                                    <NormalInput title="Nome"
                                        size={window.screen.width < 1600 ? 25 : 38}
                                        setValueInput={setValueInputCourseName}
                                        error={errorInputCourseName}
                                        msgErro="O campo de Nome deve ser preenchido"
                                        dValue={o?.name ? o?.name : valueInputCourseName} />
                                    <Select options={["Alimentos", "Mecânica", "Matrizaria", "Eletrica", "Construção"]}
                                        title="Área"
                                        size={window.screen.width < 1600 ? 13 : 15}
                                        error={errorInputCourseField}
                                        msgErro="Deve ser selecionada uma área!" />
                                    <Select options={["Iniciação", "Técnico", "Capacitação", "Superior", "Aperfeiçoamento"]}
                                        title="Modalidade"
                                        error={errorInputCourseModality}
                                        msgErro="Deve ser selecionada uma Modalidade!"
                                        size={window.screen.width < 1600 ? 13 : 15} />

                                    <Tags tags={tags} setTags={setTags} />
                                    <NormalInput title="Duração"
                                        size={window.screen.width < 1600 ? 13 : 15}
                                        setValueInput={setValueInputCourseDuration}
                                        error={errorInputCourseDuration}
                                        msgErro="Deve ser selecionada uma Duração (ex: 2 meses)!"

                                    />

                                    <ConteudoSec1FormCursoDividido className="row">
                                        <div className="col-6">
                                            <Money title="Valor do curso"
                                                size={window.screen.width < 1600 ? 13 : 15}
                                                setValueInput={setValueInputCourseCost}
                                                error={errorInputCourseCost}
                                                msgErro="Deve ser adicionado um valor maior que zero!"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <NormalInput title="Parcelas"
                                                size={window.screen.width < 1600 ? 13 : 15}
                                                setValueInput={setValueInputPayment_installment}
                                                error={errorInputCoursePayment_installment}
                                                msgErro="Deve ser adicionada uma quantia minima de parcelas!"
                                            />
                                        </div>
                                    </ConteudoSec1FormCursoDividido>
                                    <Money title="Taxa de Matricula"
                                        size={window.screen.width < 1600 ? 13 : 15}
                                        setValueInput={setValueInputEnrolment_fee}
                                        error={errorInputEnrolment_fee}
                                        msgErro="Deve ser adicionado um valor, mesmo que esse valor seja zero!"
                                    />



                                </ConteudoSec1FormCurso>

                                <ConteudoSec2FormCurso className="col-4">
                                    <TextBoxContainer>
                                        <TextBoxTitle>Descrição</TextBoxTitle>
                                        {/* <TextBoxCurso /> */}
                                        <TextBoxInput
                                            error={errorInputCourseDescription}
                                            hSize={15}
                                            msgError="O campo de Descrição deve ser preenchido"
                                            wSize={36}
                                            setValueInput={setValueInputCourseDescription}
                                        />
                                    </TextBoxContainer>

                                    <TextBoxContainer>
                                        <TextBoxTitle>Pré Requisitos</TextBoxTitle>
                                        {/* <TextBoxCurso /> */}
                                        <TextBoxInput
                                            error={errorInputCoursePrerequisites}
                                            hSize={15}
                                            msgError="O campo de Pré Requisitos deve ser preenchido"
                                            wSize={36}
                                            setValueInput={setValueInputCoursePrerequisites}
                                        />
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
                                <ButtonSaveFooterCurso onClick={() => SendObjectCourse()}>SALVAR</ButtonSaveFooterCurso>
                            </BottomLineCurso>

                        </PrincipalDivEditCurso>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EditCurso;