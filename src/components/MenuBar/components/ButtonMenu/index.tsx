import React, {
  SVGProps, useCallback, useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../../../global/styles/styles';

import {
  Container, IconContent, LeftBar, NotificationCount, TransitionGroup,
} from './styles';

interface ButtonMenuProps {
  title: string;
  path: string;
  icon: React.FunctionComponent<SVGProps<SVGSVGElement>>;
  selectedRoute: string;
  totalNotification?: number;
  onClick?: Function;
  isOpen?: boolean;
}

const ButtonMenu: React.FC<ButtonMenuProps> = ({
  title,
  path,
  icon: Icon,
  totalNotification = 0,
  selectedRoute,
  onClick = () => {},
  isOpen = false,
}) => {
  const navigate = useNavigate();

  const confirmNavigation = useCallback(() => {
    onClick(path);
    navigate(path);
  }, [onClick, navigate, path]);

  const selectedStyle = useMemo(() => (selectedRoute === path
    ? { color: theme.colors.primary100 }
    : { color: theme.colors.secondary60 }), [selectedRoute, path]);

  return (
    <Container isSelected={selectedRoute === path} onClick={confirmNavigation}>
      <IconContent>
        <LeftBar />
        <Icon style={selectedStyle} />
      </IconContent>
      <TransitionGroup
        in={isOpen}
        timeout={200}
        classNames="fade"
        unmountOnExit
      >
        <h1>{title}</h1>
      </TransitionGroup>
      {totalNotification > 0 && (
      <NotificationCount isOpen={isOpen}>
        <h2>{totalNotification}</h2>
      </NotificationCount>
      )}
    </Container>
  );
};

export default ButtonMenu;
