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
    outCode?: string;
    msgErro?: string;
    error?: boolean;
    getValueInput?: (e: string) => void; //pegar o valor que está no campo digitado
    setValueInput?: (e: string) => void; //colocar um valor no campo digitado
}

export interface MoneyInput {
    size: number;
    title: string;
    pValue?: number;//É o valor em sí do campo
    dValue?: string; //É o valor inicial preenchido no campo
    selfCode?: string;
    outCode?: string;
    msgErro?: string;
    error?: boolean;
    getValueInput?: (e: number) => void; //pegar o valor que está no campo digitado
    setValueInput?: (e: any) => void; //colocar um valor no campo digitado
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
    getValueInput?: (e: string) => void; //pegar o valor que está no campo digitado
    setValueInput?: (e: any) => void; //colocar um valor no campo digitado
}

export interface DateInputI {
    title: string;
    size: number;
}

export interface TextAreaInputI {
    header?: string; //texto que vai ficar em cima da caixa
    dValue?: string; //É o valor inicial preenchido no campo
    wSize: number; //width
    hSize: number; //height
    error: boolean;
    msgError: string;
    setValueInput?: (e: string) => void;
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