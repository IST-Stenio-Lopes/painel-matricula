import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/notfoundpage');
  }, []);

  return null;
};

export default NotFoundPage;
