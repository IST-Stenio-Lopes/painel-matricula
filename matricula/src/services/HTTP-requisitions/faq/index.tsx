import React, { useEffect } from "react";
import api from '../../api';
import { useFaq } from "../../../contexts/faq";

const { stateFaq, dispatch } = useFaq();



export function PostFaq() {
    if (!stateFaq.id) {
        useEffect(() => {
            api
                .post("/faq/", {
                    stateFaq
                })
                .then((response) => alert("FAQ Cadastrado"))
                .catch((err) => {
                    console.error("ops! ocorreu um erro" + err);
                });
        }, []);
    }
    else {
        alert("O objeto contem um id, logo, não pode ser uma requisição do tipo POST")
    }
}

export function PutFaq() {
    if (stateFaq.id) {
        useEffect(() => {
            api
                .put("/faq/", {
                    stateFaq
                })
                .then((response) => alert("FAQ Atualizado"))
                .catch((err) => {
                    console.error("ops! ocorreu um erro" + err);
                });
        }, []);
    }
    else {
        alert("O objeto não contem um id, logo, não pode ser uma requisição do tipo PUT")
    }
}

