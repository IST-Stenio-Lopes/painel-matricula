import React from "react";
import DateInput from "../../../inputs/date";
import Select from "../../../inputs/select";
import { HeadFormMatricula, SubTitleHeadFormMatricula, TitleHeadFormMatricula } from "../style";
import { ConteudoDivStep1, PrincipalDivStep1 } from "./style";





export default function StepOne() {


    return (
        <PrincipalDivStep1>
            <form>
            <HeadFormMatricula>

                <TitleHeadFormMatricula>
                    Informações do Curso
                </TitleHeadFormMatricula>
                <SubTitleHeadFormMatricula>
                    Detalhes do curso selecionado pelo aluno
                </SubTitleHeadFormMatricula>

            </HeadFormMatricula>

            <ConteudoDivStep1>
                <Select options={['Jogos Digitais', 'Arquitetura', 'Artes na Praia']} title="Curso" size={40} />
                <Select options={['2419 - Programação em Jogos Digitais', '007 - Desenhos em Jogos Digitais', '2012 - O fim do Mundo em Jogos Digitais']} title="Turma" size={40} />
                <DateInput />
                <Select options={['Manhã', 'Tarde', 'Noite']} title="Turno" size={40} />
                <Select options={['Jogos Digitais', 'Arquitetura', 'Artes na Praia']} title="Parceria" size={40} />
                <Select options={['Jogos Digitais', 'Arquitetura', 'Artes na Praia']} title="Pagou" size={40} />
            </ConteudoDivStep1>
            </form>

        </PrincipalDivStep1>
    );
}