import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';
import FaqList from '../pages/Faq/FaqList';
import NewFaq from '../pages/Faq/NewFaq';
import CustomRoute from './Route';

const FaqRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<CustomRoute isPrivate component={<FaqList />} />} />
    <Route path="/topico" element={<CustomRoute isPrivate component={<NewFaq />} />} />
  </Routes>
);

export default FaqRoutes;
