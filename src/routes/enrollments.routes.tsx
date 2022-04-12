import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';
import EnrollmentsList from '../pages/Enrollment/EnrollmentsList';
import EnrollmentDetails from '../pages/Enrollment/NewEnrollment';
import CustomRoute from './Route';

const EnrollmentsRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<CustomRoute isPrivate component={<EnrollmentsList />} />} />
    <Route path="/detalhes" element={<CustomRoute isPrivate component={<EnrollmentDetails />} />} />
  </Routes>
);

export default EnrollmentsRoutes;
