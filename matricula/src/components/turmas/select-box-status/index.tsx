import React, { useState } from "react";
import { FieldSelectBoxMatricula, ImageSelectBoxMatricula, OptionSelectBoxMatricula } from "./style";
import Aberta from '../../../assets/lock-on.svg';
import Fechada from '../../../assets/lock-off.svg';
import Finalizada from '../../../assets/lock-block.svg';
import { updateTurmasStatus } from '../turmas-utils/turmas-utilities';
import Modal from "../../modal";

interface SelectStatusMatriculaI {
    name: string,
}

const SelectStatusMatricula: React.FC<SelectStatusMatriculaI> = (props) => {

    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);

    return (
        <div>
            {show ? <Modal img={1} msg="Você tem certeza que deseja alterar o status da turma?" onClose={() => alert('a')} onConfirm={() => updateTurmasStatus(value)} /> : <></>}

            <FieldSelectBoxMatricula>
                <OptionSelectBoxMatricula name="Fechada" value={props.name} onClick={() => setShow(true)}>
                    <ImageSelectBoxMatricula src={Fechada} />
                    Fechada
                </OptionSelectBoxMatricula>
                <OptionSelectBoxMatricula name="Aberta" value={props.name} onClick={() => setValue("Aberta")}>
                    <ImageSelectBoxMatricula src={Aberta} />
                    Aberta
                </OptionSelectBoxMatricula>
                <OptionSelectBoxMatricula name="Finalizada" value={props.name} onClick={() => setValue("Finalizada")}>
                    <ImageSelectBoxMatricula src={Finalizada} />
                    Finalizada
                </OptionSelectBoxMatricula>
            </FieldSelectBoxMatricula>
        </div>
    );

}
export default SelectStatusMatricula;