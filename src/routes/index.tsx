import React from 'react';
import {
  Routes as RoutesDOM, useLocation, Route,
} from 'react-router-dom';
import MenuBar from '../components/MenuBar';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import SchoolRoutes from './school.routes';
import FinancialList from '../pages/Financial/FinancialList';
import CoursesRoutes from './courses.routes';
import ClassroomRoutes from './classroom.routes';
import FaqRoutes from './faq.routes';
import MessagesRoutes from './messages.routes';
import Report from '../pages/Report';
import UsersRoutes from './users.routes';
import ForgotPassword from '../pages/ForgotPassword';
import AdvertisingRoutes from './advertising.routes';
import EnrollmentsRoutes from './enrollments.routes';
import CustomRoute from './Route';
import PartnerRoutes from './partner.routes';

const Routes: React.FC = () => {
  const location: any = useLocation();

  return (
    <>
      { location.pathname !== '/'
       && location.pathname !== '/forgot'
       && location.pathname !== '/404'
       && !location.pathname.includes('esqueceu-senha')
      && (
        <MenuBar />
      )}
      <RoutesDOM>
        <Route path="/" element={<CustomRoute component={<SignIn />} />} />
        <Route path="/esqueceu-senha" element={<CustomRoute component={<ForgotPassword />} />} />
        <Route path="/dashboard" element={<CustomRoute isPrivate component={<Dashboard />} />} />
        <Route path="/matricula/*" element={<CustomRoute isPrivate component={<EnrollmentsRoutes />} />} />
        <Route path="/turmas/*" element={<CustomRoute isPrivate component={<ClassroomRoutes />} />} />
        <Route path="/cursos/*" element={<CustomRoute isPrivate component={<CoursesRoutes />} />} />
        <Route path="/anuncios/*" element={<CustomRoute isPrivate component={<AdvertisingRoutes />} />} />
        <Route path="/unidade/*" element={<CustomRoute isPrivate component={<SchoolRoutes />} />} />
        <Route path="/mensagens/*" element={<CustomRoute isPrivate component={<MessagesRoutes />} />} />
        <Route path="/relatorio" element={<CustomRoute isPrivate component={<Report />} />} />
        <Route path="/faq/*" element={<CustomRoute isPrivate component={<FaqRoutes />} />} />
        <Route path="/financeiro" element={<CustomRoute isPrivate component={<FinancialList />} />} />
        <Route path="/usuarios/*" element={<CustomRoute isPrivate component={<UsersRoutes />} />} />
        <Route path="/parceiros/*" element={<CustomRoute isPrivate component={<PartnerRoutes />} />} />
      </RoutesDOM>
    </>
  );
};

export default Routes;
