import React, { useState } from "react";
import { Align, Bottom, Head, UserInformations } from "./style";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Key from "../../../inputs/key";
import { SaveButton } from "../../../inputs/style";
import Modal from "../../../modal";



const currencies = [
    {
        value: 'Diretor(a)',
        label: 'Diretor(a)',
    },
    {
        value: 'Secretário(a)',
        label: 'Secretário(a)',
    },
    {
        value: 'Coordenador(a)',
        label: 'Coordenador(a)',
    },
    {
        value: 'Administrador(a)',
        label: 'Administrador(a)',
    },
];


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: '25ch',
        },
    }),
);

export default function Informations() {



    const classes = useStyles();
    const [currency, setCurrency] = React.useState('Secretário(a)');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value);
    };

    const [showExit, setShowExit] = useState<boolean>();

    return (

        <UserInformations>
            {
                (showExit && <Modal img={5} msg="Você tem certeza que deseja salvar as informações?" show={showExit} onClose={() => setShowExit(false)} onConfirm={() => setShowExit(false)} />)
            }
            <Head>
                <div className="row">
                    <div className="col-3">
                        <p>Informações Pessoais</p>
                    </div>
                    <div className="col-9">
                        <p>Preencha suas informações e escolha dados de acesso</p>
                    </div>
                </div>
            </Head>

            <Align>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Nome" />
                    <TextField id="standard-basic" label="Matricula" />
                    <TextField id="standard-basic" label="CPF" />
                    <TextField id="standard-basic" label="Telefone" />
                    <TextField
                        id="standard-select-currency-native"
                        select
                        label="Nível de Acesso"
                        value={currency}
                        onChange={handleChange}
                        size="medium"
                        SelectProps={{
                            native: true,
                        }}
                    >
                        {currencies.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                    <TextField id="standard-basic" label="Email" />
                    <Key title="Senha" />
                    <Key title="Confirmar Senha" />

                </form>
            </Align>

            <Bottom>
                <SaveButton onClick={() => setShowExit(true)}>SALVAR</SaveButton>
            </Bottom>



        </UserInformations>
    );
}