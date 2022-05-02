import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
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
import { DecodedProps, useAuth } from '../../hooks/auth';
import { ISchoolSocketData } from '../../interfaces/ISocket';
import { useDashboardData } from '../../hooks/dashboardData';
import api, { baseURL } from '../../services/api';
import { getTimeOut } from '../../pages/Dashboard/utils/utilities';

const ENDPOINT = 'http://192.168.1.191:4445/dashboard';

const MenuBar: React.FC = () => {
  const {
    setCurrentDashboardData, currentDashboardData, enrollmentsHeld, enrollmentsReserved, messages,
  } = useDashboardData();
  const {
    user, signOut, data: authData, updateData,
  } = useAuth();

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

  const stayLogged = useCallback(async () => {
    await api.post('/dashboard/refresh-token', {
      token: authData.refresh_token,
    }).catch((err) => {
      configModal(
        'Sessão expirada, faça Log In novamente',
        'error',
      );
      handleVisible();
      signOut();
    }).then((response: any) => {
      updateData({
        ...authData,
        token: response.data.token,
        refresh_token: response.data.refresh_token,
      });
    });
  }, [authData, configModal, handleVisible, signOut, updateData]);

  const isValidToken = useCallback((value: string) => {
    const decoded: DecodedProps = jwtDecode(value);

    const expirationTime = (decoded.exp * 1000);

    return (Date.now() < expirationTime);
  }, []);

  useEffect(() => {
    if (user) {
      const socket = socketIOClient(`${baseURL}:2225`, {
        path: '/dashboard',
        auth: {
          school_id: user.school_id,
        },
      });

      socket.on('notification_data', (data) => {
        setCurrentDashboardData(data);
      });

      socket.on('message_has_been_read', (data) => {
        setCurrentDashboardData({
          ...currentDashboardData as ISchoolSocketData,
          messages: data.quantity,
        });
      });

      socket.connect();

      return (() => { socket.close(); });
    }
    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (authData.token) {
      const { token } = authData;
      const decoded: DecodedProps = jwtDecode(token);

      const expirationTime = (decoded.exp * 1000);

      const timeOut = getTimeOut(expirationTime);

      if (token && isValidToken(token)) {
        timer = setTimeout(() => {
          configModal(
            'Sua sessão irá expirar, deseja permanecer logado?',
            'logout',
            true,
            false,
            () => stayLogged(),
            () => signOut(),
          );

          handleVisible();
        }, timeOut);
      }
    }

    return () => { if (timer) clearTimeout(timer); };
  }, [isValidToken, authData, stayLogged, signOut, configModal]);

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
