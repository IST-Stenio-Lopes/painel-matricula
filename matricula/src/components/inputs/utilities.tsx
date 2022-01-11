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
    size: number
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