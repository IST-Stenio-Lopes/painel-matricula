import React, { ReactElement } from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Navigate,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: ReactElement;
}

const CustomRoute: React.FC<RouteProps> = ({
  isPrivate = false, component: Component,
}) => {
  const { user } = useAuth();

  return (
    isPrivate === !!user ? Component
      : <Navigate to={isPrivate ? '/' : '/dashboard'} />
  );
};

export default CustomRoute;
