import React, { useState, useEffect } from "react";
import { DeleteData } from "./test.utils";
import Data from './teste-data.json';


export default function TesteFunctions() {

    const [data, setData] = useState<any[]>([]);


    useEffect(() => {

        const data = DeleteData(Data, 2); 
        setData(data); 
    }, [] )



    return (
        <>
            <h1>hello</h1>
        </>
    );

}