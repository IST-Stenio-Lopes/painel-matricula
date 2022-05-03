import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';
import SettingsDetails from '../pages/Settings/SettingsDetails';
import CustomRoute from './Route';

const MessagesRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<CustomRoute isPrivate component={<SettingsDetails />} />} />
  </Routes>
);

export default MessagesRoutes;
