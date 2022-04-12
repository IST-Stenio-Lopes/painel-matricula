import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';
import AdvertisingDetails from '../pages/Advertising/AdvertisingDetails';
import AdvertisingList from '../pages/Advertising/AdvertisingList';
import CustomRoute from './Route';

const AdvertisingRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<CustomRoute isPrivate component={<AdvertisingList />} />} />
    <Route path="/detalhes" element={<CustomRoute isPrivate component={<AdvertisingDetails />} />} />
  </Routes>
);

export default AdvertisingRoutes;
