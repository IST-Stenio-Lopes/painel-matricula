import React from "react";
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
        <TextField id="standard-basic" label={props.title} className={classes.textField} />
    );
}
export default NormalInput;