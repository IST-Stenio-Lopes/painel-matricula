import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import ButtonMenu from './components/ButtonMenu';
import { SidebarData } from './components/SideBarData';
import {
  TopBar, DashboardTopBar, SideBar, HeaderArea, BodyArea, FooterArea,
} from './styles';

import { ReactComponent as Logo } from '../../assets/icons/menu/logo-tipo.svg';
import BackButton from '../Forms/Buttons/BackButton';
import { useNav } from '../../hooks/nav';

import Profile from '../Profile';
import { useModal } from '../../hooks/modal';
import { useAuth } from '../../hooks/auth';
import { ISchoolSocketData } from '../../interfaces/ISocket';
import { useDashboardData } from '../../hooks/dashboardData';
import { baseURL } from '../../services/api';

const ENDPOINT = 'http://192.168.1.191:4445/dashboard';

const MenuBar: React.FC = () => {
  const {
    setCurrentDashboardData, currentDashboardData, enrollmentsHeld, enrollmentsReserved, messages,
  } = useDashboardData();
  const { user } = useAuth();

  const location: any = useLocation();

  const initialRoute = useMemo(() => `/${location.pathname.split('/')[1]}`, [location]);
  const { configModal, handleVisible } = useModal();

  const { hasBackButton, handleBackButton, isEditing } = useNav();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(initialRoute);

  const getNotifications: {[key: string]: number} = useMemo(() => ({
    Matrícula: currentDashboardData
      ? (currentDashboardData.enrollments_held + currentDashboardData.enrollments_reserved) : 0,
    Mensagens: currentDashboardData ? currentDashboardData.messages : 0,
  }), [currentDashboardData]);

  const handleSelect = useCallback((value) => {
    setSelectedRoute(value);
  }, []);

  const handleConfirmGoBack = useCallback(() => {
    if (isEditing) {
      configModal(
        'Ao sair da tela os dados serão perdidos, deseja realmente sair sem salvar?',
        'save',
        true,
        true,
        () => handleBackButton,
      );

      handleVisible();
    } else {
      handleBackButton();
    }
  }, [isEditing, configModal, handleVisible, handleBackButton]);

  useEffect(() => {
    const socket = socketIOClient(`${baseURL}:2225`, {
      path: '/dashboard',
      auth: {
        school_id: user.school_id,
      },
    });

    socket.on('notification_data', (data) => {
      console.dir(data);
      setCurrentDashboardData(data);
    });

    socket.on('message_has_been_read', (data) => {
      setCurrentDashboardData({
        ...currentDashboardData as ISchoolSocketData,
        messages: data.quantity,
      });
    });

    socket.connect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TopBar>
        <Profile />
        {hasBackButton && <BackButton handleBack={handleConfirmGoBack} label="Voltar" />}
      </TopBar>
      {location.pathname === '/dashboard' && <DashboardTopBar />}
      <SideBar onMouseOver={() => setIsOpen(true)} onMouseOut={() => setIsOpen(false)}>
        <HeaderArea>
          <Logo width="80%" height="80%" />
        </HeaderArea>
        <BodyArea>
          {SidebarData.map(({ icon, title, path }) => (
            <ButtonMenu
              key={title}
              icon={icon}
              title={title}
              path={path}
              isOpen={isOpen}
              onClick={handleSelect}
              selectedRoute={selectedRoute}
              totalNotification={getNotifications[title] || 0}
            />
          ))}
        </BodyArea>
        <FooterArea />
      </SideBar>
    </>
  );
};

export default MenuBar;
