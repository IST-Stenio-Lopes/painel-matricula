import React, { useState } from 'react';
import { TextField, Input } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { InputAdornment } from '@material-ui/core';
//import ValidationTextFields from '../../utils/utilities';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { RememberKey } from '../style';


export default function LoginHome() {
    const [password, setPassword] = useState()
    const [showPassword, setShowPassword] = useState(false)
    const [typePassword, setTypePassword] = useState("text")
    const [error, setError] = useState(false);

    const handleClickShowPassword = () => {

        setShowPassword(!showPassword);
        showPassword ? setTypePassword("text") : setTypePassword("password");

    };


    /*const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            margin: {
                margin: theme.spacing(1),
            },
        }),
    );*/


    return (
        <div>
            <div>
                <p className="text-start fs-3 fw-bold">Seja bem vindo(a)!</p>
                <p className="fw-light text-black-50">Preencha os campos abaixo para acessar sua conta</p>
            </div>
            <div className="preenchimento">
                <div className="campos">
                    <TextField fullWidth id="test" placeholder="Email" variant="standard" error={error} helperText={error ? 'email ou senha incorretos' : ''} />
                </div>
                <div className="campos">
                    <Input
                        error={error}
                        id="standard-adornment-password"
                        fullWidth
                        type={typePassword}
                        value={password}
                        placeholder="Senha"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={() => { }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        } />
                </div>
                <div className="campos-inferior">
                    <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /><RememberKey>Lembrar dados</RememberKey>
                    <a href="#" className="text-decoration-none position-sticky  start-100 translate-middle">Esqueceu a senha?</a>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto mt-5">
                    <button className="btn btn-primary" type="button" onClick={() => setError(!error)}>Entrar</button>
                </div>

            </div>
        </div>

    );
}

