import React, { useState } from "react";
import { TextField, Input } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

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
        <div>
            <div>
                <p className="text-start fs-3 fw-bold">Você esqueceu sua senha?</p>
                <p className="fw-light text-black-50 fs-6">Digite abaixo o email que você utiliza para acessar a conta
                    e nós enviaremos um link para cadastro de uma nova senha.</p>
            </div>
            <div>

                <TextField fullWidth id="standard-basic" label="Email" variant="standard" error={error} />
                <div className="d-grid gap-2 col-6 mx-auto mt-5">
                    <button className="btn btn-primary" type="button" onClick={() => setError(!error)}>Entrar</button>
                </div>

            </div>

        </div>
    );
}