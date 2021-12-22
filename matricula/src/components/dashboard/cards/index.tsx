import React from 'react';
import { CardProps, PositiveNumber } from '../../../utils/utilities';
import { CardInformation, CardPainelActived, CardPainelDesable, CardProgressBar, CardStatistic, CardTitle } from './style';
import './style.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import StickyHeadTable from '../turmas';
import Mensagens from '../mensagens';




const Card: React.FC<CardProps> = (props) => {
    var percentMatriculadosPeloApp = -10;
    var percentMatriculadosNaUnidade = 15;

    return (

        <div>

            <div className="card">

                <div className="row">
                    <div className="col-9">
                        <div className="row">
                            <div className="col-4">
                                <CardPainelActived>
                                    <CardTitle>MATRICULADOS PELO APP</CardTitle>
                                    <CardInformation>{props.matriculadosApp}</CardInformation>
                                    <CardStatistic percent={percentMatriculadosPeloApp}>{PositiveNumber(percentMatriculadosPeloApp)}<p>Desde o último mês</p></CardStatistic>
                                </CardPainelActived>
                            </div>
                            <div className="col-4">
                                <CardPainelActived>
                                    <CardTitle>MATRICULADOS NA UNIDADE</CardTitle>
                                    <CardInformation>{props.matriculadosUnidade}</CardInformation>
                                    <CardStatistic percent={percentMatriculadosNaUnidade}>{PositiveNumber(percentMatriculadosNaUnidade)}<p>Desde o último mês</p></CardStatistic>
                                </CardPainelActived>
                            </div>
                            <div className="col-4">
                                <CardPainelActived>
                                    <CardTitle>VAGAS PREENCHIDAS</CardTitle>
                                    <CardInformation>{props.vagasPreenchidas}%</CardInformation>
                                    <CardProgressBar><LinearProgress variant="determinate" value={props.vagasPreenchidas} /></CardProgressBar>

                                </CardPainelActived>
                            </div>
                            <div className="elementMargin">
                                <StickyHeadTable />
                            </div>

                        </div>

                    </div>
                    <div className="col-3">
                        <CardPainelDesable>
                            <CardTitle>NOTIFICAÇÕES</CardTitle>
                        </CardPainelDesable>
                        <Mensagens />
                    </div>

                </div>
            </div>


        </div>

    );
}
export default Card;