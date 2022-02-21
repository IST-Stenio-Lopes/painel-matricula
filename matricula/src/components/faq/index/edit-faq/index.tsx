import React, { useEffect, useState } from "react";

import { useFaq } from "../../../../contexts/faq";
import { NavCompensing, PreencherCol10 } from "../../../dashboard/style";
import NormalInput from "../../../inputs/normal";
import Select from "../../../inputs/select";
import TextBoxInput from "../../../inputs/text-area";
import { HeadFormMatricula, SubTitleHeadFormMatricula, TitleHeadFormMatricula } from "../../../matricula/edit-student/style";
import Menu from "../../../menu";
import Navbar from "../../../navbar";
import TopLine from "../../../top-line";
import { BottomLineFaq, ButtonSaveFooterFaq, ConteudoDivFaq, PrincipalDivFaq } from "./style";

interface SendObjectFaq {
    id?: string,
    title: string,
    category: string,
    content: string,

}
interface data {
    o?: SendObjectFaq;
}


export const EditFaq: React.FC<data> = ({ o }) => {
    const { stateFaq, dispatch } = useFaq();
    const [errorInputTitleFaq, setErrorInputTitleFaq] = useState(false);
    const [errorInputContentFaq, setErrorInputContentFaq] = useState(false);
    const [valueInputFaqTitle, setValueInputFaqTitle] = useState('');
    const [valueInputFaqContent, setValueInputFaqContent] = useState('');

    useEffect(() => {
        (o?.title && setValueInputFaqTitle(o?.title));
        (o?.content && setValueInputFaqContent(o?.content))
    }, [])

    function SendObjectFaq() {
        setErrorInputTitleFaq(false);
        setErrorInputContentFaq(false);
        if (valueInputFaqTitle === "") {
            setErrorInputTitleFaq(true);
        }
        else if (valueInputFaqContent === "") {
            setErrorInputContentFaq(true);
        }
        else {
            alert("Cadastrado com sucesso!");
        }

    }

    function InitialValueTitleFaq() {
        setValueInputFaqTitle(o ? o?.title : '');
        return valueInputFaqTitle;

    }


    /* const handleFaqChange = (id: string, title: string, category: string, content: string) => {
        dispatch({
            type: FaqActions.setId,
            payload: id
        });
        dispatch({
            type: FaqActions.setTitle,
            payload: title
        });
        dispatch({
            type: FaqActions.setCategory,
            payload: category
        });
        dispatch({
            type: FaqActions.setContent,
            payload: content
        });
    } */

    return (
        <div className="container-fluid login">
            <div className="row login">
                <div className="col-2 ">
                    <NavCompensing status={false} />
                    <Menu />
                </div>
                <div className="col-10 ">
                    <Navbar />
                    <TopLine name="Novo Tópico" />

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
                                <NormalInput setValueInput={setValueInputFaqTitle} title="Tópico" size={35} error={errorInputTitleFaq} msgErro={"O campo de Tópico deve ser preenchido"} dValue={o?.title ? o?.title : valueInputFaqTitle} />
                                <Select title="Categorias" size={25} defaultValue={o ? o.category : ''} options={["Pagamentos", "Sobre o SENAI", "EAD", "Descontos", "Cursos", "Matriculas"]} />
                                {/*                                 <label>Texto</label>
                                <textarea id="story" name="story" rows={12} cols={5}>

                                </textarea> */}
                                <TextBoxInput setValueInput={setValueInputFaqContent} wSize={60} hSize={34} header="Texto" dValue={o?.content ? o?.content : valueInputFaqContent} error={errorInputContentFaq} msgError="O Campo de texto não pode estar vazio" />
                            </form>
                        </ConteudoDivFaq>
                        <BottomLineFaq />
                        <ButtonSaveFooterFaq onClick={() => SendObjectFaq()}>SALVAR</ButtonSaveFooterFaq>
                    </PrincipalDivFaq>
                </div>
            </div>
        </div>

    );
}
export default EditFaq;