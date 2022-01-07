import React from 'react';
import { Routes, Route, BrowserRouter, useLocation, } from 'react-router-dom';
import Login from '../components/login';
import Home from '../components/home';
import Error from '../components/404';
import DashBoard from '../components/dashboard';

const Routees = () => {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/matricula" element={<Login />} />
        <Route path="/cursos" element={<Login />} />
        <Route path="/turmas" element={<Login />} />
        <Route path="/anuncios" element={<Login />} />
        <Route path="/unidade" element={<Login />} />
        <Route path="/mensagens" element={<Login />} />
        <Route path="/relatorio" element={<Login />} />
        <Route path="/faq" element={<Login />} />
        <Route path="/financeiro" element={<Login />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Routees;