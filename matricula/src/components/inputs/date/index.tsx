import React from "react";
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { createStyles, makeStyles } from '@material-ui/core/styles';


import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { DateInputI } from "../utilities";


const DateInput: React.FC<DateInputI> = (props) => {
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date('2021-08-18T21:11:54'),
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };
    const useStyles = makeStyles(() =>
        createStyles({
            textField: {
                width: props.size.toString() + 'ch'
            },
        }),
    );
    const classes = useStyles();

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="flex-start">
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label={props.title}
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    className={classes.textField}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
export default DateInput;