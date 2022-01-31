import React from 'react';
import { Hours, LinkExpandMessages, Mensages, NameUserMensager, Title, UserMensagerContent } from './style';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Data from '../mensagens/mock-data.json';


export default function Mensagens() {
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
    const classes = useStyles();
    var resolution = window.screen.width > 1500? classes.large : classes.root;
    return (

        <Mensages>
            <Title>Mensagens</Title>

            <div className="mensages-container">
                <div className="row">
                    <div className="col-3">
                        <Avatar className={resolution}>JM</Avatar>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-9">
                                <NameUserMensager>Juliana Morais</NameUserMensager>
                            </div>
                            <div className="col-3">
                                <Hours>2h atrás</Hours>
                            </div>
                            <UserMensagerContent>Olá. Gostaria de saber quando que </UserMensagerContent>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mensages-container">
                <div className="row">
                    <div className="col-3">
                        <Avatar className={resolution}>PO</Avatar>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-9">
                                <NameUserMensager>Pedro Oliveira</NameUserMensager>
                            </div>
                            <div className="col-3">
                                <Hours>3h atrás</Hours>
                            </div>
                            <UserMensagerContent>Qual é o prazo para que o curso…</UserMensagerContent>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mensages-container">
                <div className="row">
                    <div className="col-3">
                        <Avatar className={resolution}>LP</Avatar>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-9">
                                <NameUserMensager>Lucca Pontes</NameUserMensager>
                            </div>
                            <div className="col-3">
                                <Hours>5h atrás</Hours>
                            </div>
                            <UserMensagerContent>Vocês poderiam verificar o motivo… </UserMensagerContent>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mensages-container">
                <div className="row">
                    <div className="col-3">
                        <Avatar className={resolution}>RM</Avatar>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-9">
                                <NameUserMensager>Richard Machado</NameUserMensager>
                            </div>
                            <div className="col-3">
                                <Hours>7h atrás</Hours>
                            </div>
                            <UserMensagerContent>Oi, gostaria de informar que estou…</UserMensagerContent>
                        </div>
                    </div>
                </div>
            </div>
            <LinkExpandMessages href="https://google.com.br">Ver Todas</LinkExpandMessages>
        </Mensages>

    );

}