import React, { useState } from 'react';
import book from '../../assets/books.png';
import logo from '../../assets/logoSenai.png';
import '../login/style.css';
import LoginHome from './home';
import ForgotPassword from './forgotPassword';
import SendMail from './sendMail';


//import MaterialIcon from 'react-google-material-icons';

//var controlador = InputAdornments();

export default function Login() {

    return (
        <div className="container-fluid login">
            <div className="row login">
                <div className="col-5 ">
                    <div className="row align-items-start justify-content-center">
                        <img src={logo} />
                    </div>
                    <div className="row align-items-center">
                        <LoginHome />
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