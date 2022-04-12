import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';
import SchoolDetails from '../pages/School/SchoolDetails';
import SchoolList from '../pages/School/SchoolList';
import CustomRoute from './Route';

const MessagesRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<CustomRoute isPrivate component={<SchoolList />} />} />
    <Route path="/detalhes" element={<CustomRoute isPrivate component={<SchoolDetails />} />} />
  </Routes>
);

export default MessagesRoutes;
