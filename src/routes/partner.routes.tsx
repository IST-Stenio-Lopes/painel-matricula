import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';

import NewPartner from '../pages/Partner/NewPartner';
import PartnerList from '../pages/Partner/PartnerList';
import CustomRoute from './Route';

const PartnerRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<CustomRoute isPrivate component={<PartnerList />} />} />
    <Route path="/detalhes" element={<CustomRoute isPrivate component={<NewPartner />} />} />
  </Routes>
);

export default PartnerRoutes;
