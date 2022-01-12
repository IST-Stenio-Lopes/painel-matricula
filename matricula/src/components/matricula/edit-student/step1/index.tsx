import React from "react";
import DateInput from "../../../inputs/date";
import Money from "../../../inputs/money";
import Select from "../../../inputs/select";
import { SaveButton } from "../../../inputs/style";
import { MatriculaChangePage } from "../../../inputs/utilities";
import { BottomMatricula, HeadFormMatricula, SubTitleHeadFormMatricula, TitleHeadFormMatricula } from "../style";
import { ConteudoDivStep1, PrincipalDivStep1 } from "./style";


//{ change }: any


const StepOne: React.FC<MatriculaChangePage> = (props) => {


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
                    <Select options={['Manhã', 'Tarde', 'Noite']} title="Turno" size={30} />
                    <Select options={['Particular', 'Gratuito', 'Artes na Praia']} title="Parceria" size={30} />
                    <Select options={['Nada', 'Completo', 'Apenas taxa de Matricula']} title="Pagou" size={30} />
                    <Money size={30} />
                </ConteudoDivStep1>
                <BottomMatricula>
                    <SaveButton onClick={props.change}>PRÓXIMO</SaveButton>
                </BottomMatricula>
            </form>

        </PrincipalDivStep1>
    );
}
export default StepOne;