import React from "react";
import { Link } from "react-router-dom";
import book from '../../../assets/books.png';
import logo from '../../../assets/logoSenai.png';



export default function SendMail() {


    return (
        <div className="container-fluid login">
            <div className="row login">
                <div className="col-5 ">
                    <div className="row align-items-start justify-content-center">
                        <img src={logo} />
                    </div>
                    <div className="row align-items-center">
                        <div>
                            <div>
                                <p className="text-start fs-3 fw-bold">Email enviado!</p>
                                <p className="fw-light text-black-50 fs-6">Um link para reset da senha foi enviado para o seu email,
                                    escolha uma nova senha e tente realizar o login novamente.</p>
                            </div>
                            <div>
                                <div className="d-grid gap-2 col-6 mx-auto mt-5">
                                    <button className="btn btn-primary" type="button" onClick={() => { window.location.href = "/" }}>VOLTAR</button>



                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="row align-items-end">
                        <p className="text-muted">© Soluções Digitais. 2020</p>
                        <p className="text-secondary  text-opacity-25">Esta é uma versão final do software desenvolvido pelo IST do SENAI PB.</p>

                    </div>
                </div>
                <div className="col-7">
                    <img src={book} />
                </div>

            </div>
        </div>


    );
}