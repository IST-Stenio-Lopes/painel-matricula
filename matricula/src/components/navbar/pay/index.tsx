import React from "react";
import { Hours, LinkExpandMessages, Mensages, NameUserMensager, Title, UserMensagerContent } from './style';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { BellNotification } from "../style";

export default function Pay() {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                display: 'flex',
                '& > *': {
                    margin: theme.spacing(1),
                },
            },
            small: {
                width: theme.spacing(3),
                height: theme.spacing(3),
            },
            large: {
                width: theme.spacing(9),
                height: theme.spacing(9),
            },
        }),
    );
    var numNewMsg = 10;

    const classes = useStyles();

    return (
        /* <div style={{ zIndex: 1, position: "absolute" }}>
            Testeeeeeeeeeeeeeeeeeeeeeee<br />Testeeeeeeeeeeeeeeeeeeeeeee<br />Testeeeeeeeeeeeeeeeeeeeeeee<br />Testeeeeeeeeeeeeeeeeeeeeeee<br />Testeeeeeeeeeeeeeeeeeeeeeee<br />
        </div> */

        /*<div>


            <p>
                <button type="button" className="btn position-relative" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">

                    <BellNotification status={true}>
                        <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle" />
                    </BellNotification>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bell text-light" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />

                    </svg>
                </button>
            </p>
            <div style={{ minHeight: 120 }}>
                <div className="collapse collapse-vertical" id="collapseWidthExample">
                    <div className="card card-body" style={{ width: 300, zIndex: 1 }}>
                        This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
                    </div>
                </div>
            </div>


        </div>*/


        <Mensages>
            <Title>você tem <pre> {numNewMsg} </pre> novos pagamentos</Title>

            <div className="mensages-container">
                <div className="row">
                    <div className="col-3">
                        <Avatar>FP</Avatar>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-9">
                                <NameUserMensager>Fernando Pinheiro</NameUserMensager>
                            </div>
                            <div className="col-3">
                                <Hours>1h atrás</Hours>
                            </div>
                            <UserMensagerContent>Confeiteiro - Bolos decorados</UserMensagerContent>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mensages-container">
                <div className="row">
                    <div className="col-3">
                        <Avatar>PS</Avatar>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-9">
                                <NameUserMensager>Paolla Santana</NameUserMensager>
                            </div>
                            <div className="col-3">
                                <Hours>1h atrás</Hours>
                            </div>
                            <UserMensagerContent>Padeiro</UserMensagerContent>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mensages-container">
                <div className="row">
                    <div className="col-3">
                        <Avatar >PH</Avatar>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-9">
                                <NameUserMensager>Pedro Henrique</NameUserMensager>
                            </div>
                            <div className="col-3">
                                <Hours>5h atrás</Hours>
                            </div>
                            <UserMensagerContent>Confeiteiro - Salgados</UserMensagerContent>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mensages-container">
                <div className="row">
                    <div className="col-3">
                        <Avatar>CS</Avatar>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-9">
                                <NameUserMensager>Cássia Sobreira</NameUserMensager>
                            </div>
                            <div className="col-3">
                                <Hours>8h atrás</Hours>
                            </div>
                            <UserMensagerContent>Confeiteiro - Tortas</UserMensagerContent>
                        </div>
                    </div>
                </div>
            </div>
            <LinkExpandMessages href="https://google.com.br">Ver Todos</LinkExpandMessages>
        </Mensages>
    );
}