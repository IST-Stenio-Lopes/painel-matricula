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