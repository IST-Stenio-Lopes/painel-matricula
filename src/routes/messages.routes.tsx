import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';
import MessageDetails from '../pages/Messages/MessageDetails';
import MessagesList from '../pages/Messages/MessagesList';
import CustomRoute from './Route';

const SchoolRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<CustomRoute isPrivate component={<MessagesList />} />} />
    <Route path="/detalhes" element={<CustomRoute isPrivate component={<MessageDetails />} />} />
  </Routes>
);

export default SchoolRoutes;
