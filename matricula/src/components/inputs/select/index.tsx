import React, { useState } from "react";
import { ChangeArrayInputSelect, SelectInput } from "../utilities";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



const Select: React.FC<SelectInput> = (props) => {
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
                width: props.size.toString() + 'ch',
            },
        }),
    );
    const currencies = ChangeArrayInputSelect(props.options);

    const classes = useStyles();
    const [currency, setCurrency] = React.useState(props.options[0]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value);
    };

    return (
        <TextField
            id="standard-select-currency-native"
            select
            label={props.title}
            value={currency}
            onChange={handleChange}
            size="medium"
            className={classes.textField}
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
    );
}

export { Select };
export default Select;