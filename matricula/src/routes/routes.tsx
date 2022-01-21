import React from 'react';
import { Routes, Route, BrowserRouter, useLocation, } from 'react-router-dom';
import Login from '../components/login';
import Home from '../components/home';
import Error from '../components/404';
import DashBoard from '../components/dashboard';
import Matricula from '../components/matricula/index/index';
import ForgotPassword from '../components/login/forgotPassword';
import SendMail from '../components/login/sendMail';
import EditProfile from '../components/dashboard/edit-profile';
import UsersList from '../components/dashboard/users';
import NewUser from '../components/dashboard/users/new-user';
import EditStudent from '../components/matricula/edit-student';
import ReservedStudents from '../components/matricula/reserved-students';
import Cursos from '../components/cursos/index';
import EditCurso from '../components/cursos/edit-curso';


const Routees = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Login />} />
                    <Route path="forgot" element={<ForgotPassword />} />
                    <Route path="sendmail" element={<SendMail />} />
                </Route>

                <Route path="dashboard">
                    <Route index element={<DashBoard />} />
                    <Route path="edit" element={<EditProfile />} />
                    <Route path="users" element={<UsersList />} />
                    <Route path="adduser" element={<NewUser />} />

                </Route>
                <Route path="matricula">
                    <Route index element={<Matricula />} />
                    <Route path="edit" element={<EditStudent />} />
                    <Route path="reserved" element={<ReservedStudents />} />
                </Route>
                <Route path="cursos">
                    <Route index element={<Cursos />} />
                    <Route path="details" element={<EditCurso />} />
                </Route>
                <Route path="turmas" element={<Login />} />
                <Route path="anuncios" element={<Login />} />
                <Route path="unidade" element={<Login />} />
                <Route path="mensagens" element={<Login />} />
                <Route path="relatorio" element={<Login />} />
                <Route path="faq" element={<Login />} />
                <Route path="financeiro" element={<Login />} />
                <Route path='*' element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
};
export default Routees;