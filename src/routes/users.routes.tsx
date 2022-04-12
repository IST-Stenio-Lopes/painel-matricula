import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';
import NewUser from '../pages/Users/NewUser';
import UserList from '../pages/Users/UserList';
import CustomRoute from './Route';

const UsersRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<CustomRoute isPrivate component={<UserList />} />} />
    <Route path="/detalhes" element={<CustomRoute isPrivate component={<NewUser />} />} />
  </Routes>
);

export default UsersRoutes;
