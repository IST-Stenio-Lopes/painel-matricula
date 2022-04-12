import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';
import ClassroomList from '../pages/Classroom/ClassroomList';
import Classrooms from '../pages/Classroom/Classrooms';
import CustomRoute from './Route';

const ClassroomRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<CustomRoute isPrivate component={<ClassroomList />} />} />
    <Route path="/detalhes" element={<CustomRoute isPrivate component={<Classrooms />} />} />
  </Routes>
);

export default ClassroomRoutes;
