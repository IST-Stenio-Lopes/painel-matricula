import React from "react";



export default function SendMail() {


    return (
        <div>
            <div>
                <p className="text-start fs-3 fw-bold">Email enviado!</p>
                <p className="fw-light text-black-50 fs-6">Um link para reset da senha foi enviado para o seu email,
                    escolha uma nova senha e tente realizar o login novamente.</p>
            </div>
            <div>
                <div className="d-grid gap-2 col-6 mx-auto mt-5">
                    <button className="btn btn-primary" type="button" >Voltar</button>
                </div>

            </div>
        </div>
    );
}