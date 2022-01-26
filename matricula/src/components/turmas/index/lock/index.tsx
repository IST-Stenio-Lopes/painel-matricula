import React from "react";
import Aberta from '../../../../assets/lock-on.svg';
import Fechada from '../../../../assets/lock-off.svg';
import Finalizada from '../../../../assets/lock-block.svg';
import SelectStatusMatricula from "../../select-box-status";
import { Cadeado } from "./style";

interface LockI {
    lock: string,
    selected: number,
    id: number
}

function getImageLockTurmas(value: string) {
    switch (value) {
        case "Aberta":
            return Aberta;
        case "Fechada":
            return Fechada;
        case "Finalizada":
            return Finalizada;
        default:
            break;
    }
}

const Lock: React.FC<LockI> = (props) => {

    return (
        <div>

            {props.id === props.selected ? <SelectStatusMatricula name={props.lock} /> : <></>}
            <Cadeado src={getImageLockTurmas(props.lock)} />


        </div>
    )
}
export default Lock;