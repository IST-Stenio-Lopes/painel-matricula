import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';
import CoursesList from '../pages/Courses/CoursesList';
import NewCourse from '../pages/Courses/NewCourse';
import CustomRoute from './Route';

const CoursesRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<CustomRoute isPrivate component={<CoursesList />} />} />
    <Route path="/curso" element={<CustomRoute isPrivate component={<NewCourse />} />} />
  </Routes>
);

export default CoursesRoutes;
