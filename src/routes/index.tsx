import React from 'react';
import {
  Routes as RoutesDOM, useLocation, Route,
} from 'react-router-dom';
import MenuBar from '../components/MenuBar';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import SchoolRoutes from './school.routes';
import SettingsRoutes from './settings.routes';
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
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  const location: any = useLocation();

  return (
    <>
      {/* { location.pathname !== '/'
       && location.pathname !== '/forgot'
       && location.pathname !== '/404'
       && !location.pathname.includes('esqueceu-senha')
      && (
      )} */}
      <RoutesDOM>
        <Route path="/" element={<CustomRoute component={<SignIn />} />} />
        <Route path="/esqueceu-senha" element={<CustomRoute component={<ForgotPassword />} />} />
        <Route path="*" element={<AppRoutes />} />
      </RoutesDOM>
    </>
  );
};

export default Routes;
