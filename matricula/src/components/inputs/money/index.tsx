import React from "react";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { MoneyInput } from "../utilities";

interface State {
    numberformat: string;
}

interface NumberFormatCustomProps {
    inputRef: (instance: NumberFormat<State> | null) => void;
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
    const { inputRef, onChange, ...other } = props;



    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value
                    }
                });
            }}
            thousandSeparator
            isNumericString
            prefix="R$  "
        />
    );
}



const Money: React.FC<MoneyInput> = (props) => {
    const [values, setValues] = React.useState<State>({
        numberformat: ""
    });
    const useStyles = makeStyles(() =>
        createStyles({
            textField: {
                width: props.size.toString() + 'ch'
            },
        }),
    );
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    return (
        <TextField
            label={props.title}
            value={values.numberformat}
            onChange={handleChange}
            name="numberformat"
            id="Moneyformat-input"
            className={classes.textField}
            InputProps={{
                inputComponent: NumberFormatCustom as any
            }}
        />
    );
}
export default Money;