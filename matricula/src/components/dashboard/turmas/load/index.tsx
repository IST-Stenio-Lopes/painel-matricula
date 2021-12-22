import React, { useState, useEffect } from "react";
import { VagasPreenchidas } from "./style";
import { LinearContainer } from "./style";
//import { colorData } from '../../../../utils/utilities';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { green, orange, red } from '@material-ui/core/colors';
import { ProgressBar } from "react-bootstrap";
import { getVariant } from "../../../../utils/utilities";
import './style.css';


interface InputProps {
    value: number;
}

export const LoadBar: React.FC<InputProps> = (props) => {



    /*switch(props.value){
        case (props.value<30):
            setTheme(lowTheme);
            break;
        case props.value >=30 && props.value <=50:
            setTheme(midTheme);
            break;
        case props.value>50:
            setTheme(highTheme);
            break;
    }*/


    return (

        <LinearContainer>
            <ProgressBar className="progress" now={props.value} variant={getVariant(props.value)} />
        </LinearContainer>


    )
}
