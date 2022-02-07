import React, { useState } from "react";
import { TextField, Input } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import book from '../../../assets/books.png';
import logo from '../../../assets/logoSenai.png';
import { BackgroundImgLateralLogin } from "../style";

export default function ForgotPassword() {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                '& > *': {
                    margin: theme.spacing(1),
                    width: '25ch',
                },
            },
        }),
    );

    const [error, setError] = useState(false);


    const classes = useStyles();

    return (
        <div className="container-fluid login">
            <div className="row login">
                <div className="col-5 ">
                    <div className="row align-items-start justify-content-center">
                        <img src={logo} />
                    </div>
                    <div className="row align-items-center">
                        <div>
                            <div>
                                <p className="text-start fs-3 fw-bold">Você esqueceu sua senha?</p>
                                <p className="fw-light text-black-50 fs-6">Digite abaixo o email que você utiliza para acessar a conta
                                    e nós enviaremos um link para cadastro de uma nova senha.</p>
                            </div>
                            <div>

                                <TextField fullWidth id="standard-basic" label="Email" variant="standard" error={error} />
                                <div className="d-grid gap-2 col-6 mx-auto mt-5">
                                    <button className="btn btn-primary" type="button" onClick={() => { !error ? setError(!error) : window.location.href = "/sendmail" }}>Entrar</button>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="row align-items-end forgot">
                        <p className="text-muted">© Soluções Digitais. 2020</p>
                        <p className="text-secondary  text-opacity-25">Esta é uma versão final do software desenvolvido pelo IST do SENAI PB.</p>

                    </div>
                </div>
                <div className="col-7">
                    <BackgroundImgLateralLogin />
                </div>

            </div>
        </div>

    );
}