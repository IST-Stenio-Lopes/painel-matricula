import React, { Children, Props, PropsWithChildren, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import logo from '../../assets/logoSenai.png';
import dashboard from '../../assets/dashboard.svg';
import dashboardActivated from '../../assets/dashboard-activated.svg';
import matricula from '../../assets/user.svg';
import matriculaActivated from '../../assets/user-activated.svg';
import cursos from '../../assets/lister.svg';
import cursosActivated from '../../assets/lister-activated.svg';
import turmas from '../../assets/group.svg';
import turmasActivated from '../../assets/group-activated.svg';
import anuncios from '../../assets/announcement.svg';
import anunciosActivated from '../../assets/announcement-activated.svg';
import unidade from '../../assets/localization.svg';
import unidadeActivated from '../../assets/localization-activated.svg';
import mensagens from '../../assets/email.svg';
import mensagensActivated from '../../assets/email-activated.svg';
import relatorio from '../../assets/print.svg';
import relatorioActivated from '../../assets/print-activated.svg';
import faq from '../../assets/ask.svg';
import faqActivated from '../../assets/ask-activated.svg';
import financeiro from '../../assets/card.svg';
import financeiroActivated from '../../assets/card-activated.svg';
import { ButtonPainel, LateralIcon, LateralText, LateralNotification } from "./style";
//import { routeValue } from "../../utils/utilities";
//import { setRouteValue } from "../../utils/utilities";

/*interface fullValue extends PropsWithChildren<any> {
    routeV: string;
}*/

export default function Menu(/*{ routeV }: fullValue*/) {
    const [routeValue, setRouteValue] = useState(window.location.pathname.slice(1).split("/")[0]);
    const [activeButton, setActiveButton] = useState("Dashboard");
    var userMensagesNumber = 31;
    var financeNumber = 12;

    let navigate = useNavigate();


    return (

        <div className="container-fluid lateral" onClick={() => console.log(routeValue)}>
            <div className="row justify-content-md-center">
                <img src={logo} />
            </div>
            <a onClick={() => { setRouteValue("dashboard"); navigate("/dashboard") }} >
                <ButtonPainel status={routeValue === "dashboard"}>
                    <div className="row button">
                        <div className="col-3 icon">
                            <LateralIcon src={routeValue === "dashboard" ? dashboardActivated : dashboard} />
                        </div>
                        <div className="col-6">
                            <LateralText> Dashboard</LateralText>
                        </div>
                        <div className="col-3">

                        </div>
                    </div>
                </ButtonPainel>
            </a>
            <a onClick={() => { setRouteValue("matricula"); navigate("/matricula") }} >
                <ButtonPainel status={routeValue === "matricula"} >
                    <div className="row button">
                        <div className="col-3 icon">
                            <LateralIcon src={routeValue === "matricula" ? matriculaActivated : matricula} />
                        </div>
                        <div className="col-6">
                            <LateralText> Matricula</LateralText>
                        </div>
                        <div className="col-3">

                        </div>
                    </div>
                </ButtonPainel>
            </a>
            <a onClick={() => { setRouteValue("cursos"); navigate("/cursos") }} >
                <ButtonPainel status={routeValue === "cursos"}>
                    <div className="row button">
                        <div className="col-3 icon">
                            <LateralIcon src={routeValue === "cursos" ? cursosActivated : cursos} />
                        </div>
                        <div className="col-6">
                            <LateralText> Cursos</LateralText>
                        </div>
                        <div className="col-3">

                        </div>
                    </div>
                </ButtonPainel>
            </a>
            <a onClick={() => { setRouteValue("turmas"); navigate("/turmas") }} >
                <ButtonPainel status={routeValue === "turmas"}>
                    <div className="row button">
                        <div className="col-3 icon">
                            <LateralIcon src={routeValue === "turmas" ? turmasActivated : turmas} />
                        </div>
                        <div className="col-6">
                            <LateralText> Turmas</LateralText>
                        </div>
                        <div className="col-3">
                            <LateralNotification status={false}><p>3</p></LateralNotification>
                        </div>
                    </div>
                </ButtonPainel>
            </a>
            <a onClick={() => { setRouteValue("anuncios"); navigate("/anuncios") }} >
                <ButtonPainel status={routeValue === "anuncios"}>
                    <div className="row button">
                        <div className="col-3 icon">
                            <LateralIcon src={routeValue === "anuncios" ? anunciosActivated : anuncios} />
                        </div>
                        <div className="col-6">
                            <LateralText> An??ncios</LateralText>
                        </div>
                        <div className="col-3">

                        </div>
                    </div>
                </ButtonPainel>
            </a>
            <a onClick={() => { setRouteValue("unidade"); navigate("/unidades") }} >
                <ButtonPainel status={routeValue === "unidades"}>
                    <div className="row button">
                        <div className="col-3 icon">
                            <LateralIcon src={routeValue === "unidade" ? unidadeActivated : unidade} />
                        </div>
                        <div className="col-6">
                            <LateralText> Unidade</LateralText>
                        </div>
                        <div className="col-3">

                        </div>
                    </div>
                </ButtonPainel>
            </a>
            <a onClick={() => { setRouteValue("mensagens"); navigate("/mensagens") }} >
                <ButtonPainel status={routeValue === "mensagens"}>
                    <div className="row button">
                        <div className="col-3 icon">
                            <LateralIcon src={routeValue === "mensagens" ? mensagensActivated : mensagens} />
                        </div>
                        <div className="col-6">
                            <LateralText> Mensagens</LateralText>
                        </div>
                        <div className="col-3">
                            <LateralNotification status={false}><p>15</p></LateralNotification>
                        </div>
                    </div>
                </ButtonPainel>
            </a>
            <a onClick={() => { setRouteValue("relatorio"); navigate("/relatorio") }} >
                <ButtonPainel status={routeValue === "relatorio"}>
                    <div className="row button">
                        <div className="col-3 icon">
                            <LateralIcon src={routeValue === "relatorio" ? relatorioActivated : relatorio} />
                        </div>
                        <div className="col-6">
                            <LateralText> Relat??rio</LateralText>
                        </div>
                        <div className="col-3">

                        </div>
                    </div>
                </ButtonPainel>
            </a>
            <a onClick={() => { setRouteValue("faq"); navigate("/faq") }} >
                <ButtonPainel status={routeValue === "faq"}>
                    <div className="row button">
                        <div className="col-3 icon">
                            <LateralIcon src={routeValue === "faq" ? faqActivated : faq} />
                        </div>
                        <div className="col-6">
                            <LateralText> FAQ</LateralText>
                        </div>
                        <div className="col-3">

                        </div>
                    </div>
                </ButtonPainel>
            </a>
            <a onClick={() => { setRouteValue("financeiro"); navigate("/financeiro") }} >
                <ButtonPainel status={routeValue === "financeiro"}>
                    <div className="row button">
                        <div className="col-3 icon">
                            <LateralIcon src={routeValue === "financeiro" ? financeiroActivated : financeiro} />
                        </div>
                        <div className="col-6">
                            <LateralText> Financeiro</LateralText>
                        </div>
                        <div className="col-3">
                            <LateralNotification status={false}><p>1</p></LateralNotification>
                        </div>
                    </div>
                </ButtonPainel>
            </a>
        </div>



    );
}