import React from "react";
import { HeadFormMatricula, SubTitleHeadFormMatricula, TitleHeadFormMatricula } from "../style";
import axios from 'axios';
import { Align2NormalInputStep2, AlignNormalInputStep2, ContainerDividerStep2, ConteudoDivStep2, ConteudoLeftStep2, ConteudoRightStep2, PrincipalDivStep2 } from "./style";
import { useEffect } from "react";
import NormalInput from "../../../inputs/normal";
import DateInput from "../../../inputs/date";
import Select from "../../../inputs/select";
import './style.css'


export default function StepTwo() {

    /*
    const cep = "58117000";
    React.useEffect(() => {
        const response = axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(function (response) {
            console.log(response.data)
        });
    }, [])*/


    return (
        <PrincipalDivStep2>
            <HeadFormMatricula>
                <TitleHeadFormMatricula>
                    Informações Pessoais
                </TitleHeadFormMatricula>
                <SubTitleHeadFormMatricula>
                    Dados documentais do aluno
                </SubTitleHeadFormMatricula>
            </HeadFormMatricula>
            <ConteudoDivStep2>

                <ConteudoLeftStep2>
                    <>

                        <NormalInput title="Nome" size={28} />

                        <ContainerDividerStep2>
                            <ConteudoLeftStep2>
                                <DateInput title="Data de Nascimento" size={13} />
                            </ConteudoLeftStep2>
                            <ConteudoRightStep2>
                                <AlignNormalInputStep2>
                                    <Select options={["Masculino", "Feminino"]} size={11} title="Sexo" />
                                </AlignNormalInputStep2>
                            </ConteudoRightStep2>
                        </ContainerDividerStep2>

                        <ContainerDividerStep2>
                            <ConteudoLeftStep2>
                                <NormalInput size={13} title="Raça" />
                            </ConteudoLeftStep2>
                            <ConteudoRightStep2>
                                <Select options={["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viuvo(a)"]} size={11} title="Estado Civil" />
                            </ConteudoRightStep2>
                        </ContainerDividerStep2>

                        <Align2NormalInputStep2>
                            <Select options={["Ensino Fundamental Incompleto", "Fundamental Completo", "Médio", "Superior"]} size={28} title="Escolaridade" />
                        </Align2NormalInputStep2>



                        <ContainerDividerStep2>

                            <ConteudoLeftStep2>
                                <AlignNormalInputStep2>
                                    <NormalInput title="CPF" size={13} />
                                </AlignNormalInputStep2>
                            </ConteudoLeftStep2>

                            <ConteudoRightStep2>
                                <AlignNormalInputStep2>
                                    <Select options={["Nenhuma", "Rastafari", "Antissocial"]} size={11} title="Cultura" />
                                </AlignNormalInputStep2>
                            </ConteudoRightStep2>

                        </ContainerDividerStep2>


                        <ContainerDividerStep2>

                            <ConteudoLeftStep2>
                                <AlignNormalInputStep2>
                                    <NormalInput title="Telefone" size={11} />
                                </AlignNormalInputStep2>
                            </ConteudoLeftStep2>

                            <ConteudoRightStep2>
                                <AlignNormalInputStep2>
                                    <NormalInput title="Orgão Emissor" size={11} />
                                </AlignNormalInputStep2>
                            </ConteudoRightStep2>

                        </ContainerDividerStep2>




                    </>
                </ConteudoLeftStep2>


                <ConteudoRightStep2>
                    <>

                        <NormalInput title="Nome do Responsável" size={28} />


                        <ContainerDividerStep2>

                            <ConteudoLeftStep2>
                                <AlignNormalInputStep2>
                                    <NormalInput title="Naturalidade" size={11} />
                                </AlignNormalInputStep2>
                            </ConteudoLeftStep2>

                            <ConteudoRightStep2>
                                <AlignNormalInputStep2>
                                    <Select options={["Física", "Visual", "Mental"]} size={11} title="Deficiência" />
                                </AlignNormalInputStep2>
                            </ConteudoRightStep2>

                        </ContainerDividerStep2>

                        <Align2NormalInputStep2>
                            <Select options={["Nenhuma", "Nem Sei oq Colocar", "Muito menos eu"]} size={28} title="Condulta" />
                        </Align2NormalInputStep2>

                        <ContainerDividerStep2>

                            <ConteudoLeftStep2>
                                <AlignNormalInputStep2>
                                    <Select options={["Particular", "Publica", "Outra? o.O"]} size={11} title="Escola" />
                                </AlignNormalInputStep2>
                            </ConteudoLeftStep2>

                            <ConteudoRightStep2>
                                <AlignNormalInputStep2>
                                    <Select options={["Estudante", "Trabalhador", "Aposentado", "Azarado", "Vag"]} size={11} title="Ocupação" />
                                </AlignNormalInputStep2>
                            </ConteudoRightStep2>

                        </ContainerDividerStep2>


                        <ContainerDividerStep2>

                            <ConteudoLeftStep2>
                                <AlignNormalInputStep2>
                                    <NormalInput title="RG" size={11} />
                                </AlignNormalInputStep2>
                            </ConteudoLeftStep2>

                            <ConteudoRightStep2>
                                <AlignNormalInputStep2>
                                    <NormalInput title="Orgão Emissor" size={11} />
                                </AlignNormalInputStep2>
                            </ConteudoRightStep2>

                        </ContainerDividerStep2>






                    </>
                </ConteudoRightStep2>

            </ConteudoDivStep2>

        </PrincipalDivStep2>
    );
}
