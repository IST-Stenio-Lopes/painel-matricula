import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { green, orange, red } from '@material-ui/core/colors';
import Add from '../assets/modal/add.png';
import Change from '../assets/modal/change.png';
import Delete from '../assets/modal/delete.png';
import Exit from '../assets/modal/exit.png';
import Save from '../assets/modal/save.png';
import Send from '../assets/modal/send.png';

//export var routeValue = "dashboard";





interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
}

export function GetModalImage(x: number | undefined) {
    switch (x) {
        case 1:
            return Add;
        case 2:
            return Change;
        case 3:
            return Delete;
        case 4:
            return Exit;
        case 5:
            return Save;
        case 6:
            return Send;
        default:
            break;
    }
}



export function InputAdornments() {
    const [values, setValues] = React.useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }
};



export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
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
}));

export function PositiveNumber(x: number) {
    if (x < 0) {
        return x * -1;
    }
    else return x;
}

export interface DivProps {
    status?: boolean;
    notifications?: number;
    statistic?: boolean;
}

export interface CardProps {
    matriculadosApp?: number;
    matriculadosUnidade?: number;
    vagasPreenchidas?: number;
    status?: boolean;
}

export interface ChangeStyle {
    change?: boolean;
}

export interface DahboardAreaExpand {
    status?: boolean;
}
export interface NotificationReceived {
    status?: boolean;
}
export interface PercentNumber {
    percent: number;
}
export interface ModalItens {
    img?: number//ImageData;
    msg?: string;
    status?: boolean;
    show?: boolean;
    onClose: () => void;
}

export interface Name {
    name: string;
}

/*export const lowTheme = createTheme({
    palette: {
        secondary: {
            main: red[500],
        },
    },
});

export const midTheme = createTheme({
    palette: {
        secondary: {
            main: orange[500],
        },
    },
});
export const highTheme = createTheme({
    palette: {
        secondary: {
            main: green[500],
        },
    },
});*/


/*export function colorData(value: number) {
    if (value < 30) {
        console.log(lowTheme);
        return lowTheme;
    } else if (value >= 30 && value <= 50) {
        console.log(midTheme);
        return midTheme;
    } else if (value > 50) {
        console.log(highTheme);
        return highTheme;
    } return lowTheme
}*/

export function getVariant(value: number) {
    if (value < 30) {
        return "danger";
    } else if (value >= 30 && value <= 50) {
        return "warning";
    } else if (value > 50) {
        return "success";
    } return "info"
}