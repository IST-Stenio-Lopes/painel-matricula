import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { NormalInputI } from "../utilities";


const NormalInput: React.FC<NormalInputI> = (props) => {



    const useStyles = makeStyles(() =>
        createStyles({
            textField: {
                width: props.size.toString() + 'ch'
            },
        }),
    );
    const classes = useStyles();


    return (
        <TextField
            id="standard-basic"
            onChange={(e) => props.setValueInput && props.setValueInput(e.target.value)}
            label={props.title}
            className={classes.textField}
            value={props.pValue}
            error={props.error}
            helperText={props.error ? props.msgErro : ''}
            defaultValue={props.dValue} />
    );
}
export default NormalInput;