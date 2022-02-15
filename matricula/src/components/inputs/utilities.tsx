import React from "react";



export interface KeyInput {
    title: string;
    status?: boolean;
}




interface SelectObject {
    value: string,
    label: string
}


export interface SelectInput {
    options: string[];
    title: string;
    size: number;
    defaultValue?: string;
}

export interface MoneyInput {
    size: number;
    title: string;
    pValue?: number;

}

export interface NormalInputI {
    title: string;
    size: number;
    pValue?: string; //É o valor em sí do campo
    dValue?: string; //É o valor inicial preenchido no campo
    selfCode?: string;
    outCode?: string;
    msgErro?: string;
    error?: boolean;
}

export interface DateInputI {
    title: string;
    size: number;
}

export interface MatriculaChangePage {
    change: () => void
}

export function ChangeArrayInputSelect(array: string[]) {
    const arraySelect: SelectObject[] = [];

    for (let i = 0; i < array.length; i++) {

        arraySelect.push({
            value: array[i],
            label: array[i]
        })

    }
    return arraySelect;
}