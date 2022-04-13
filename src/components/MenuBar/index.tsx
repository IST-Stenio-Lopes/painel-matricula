import React, {
  useCallback, useMemo, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
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

const MenuBar: React.FC = () => {
  const location: any = useLocation();

  const initialRoute = useMemo(() => `/${location.pathname.split('/')[1]}`, [location]);
  const { configModal, handleVisible } = useModal();

  const { hasBackButton, handleBackButton, isEditing } = useNav();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(initialRoute);

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
            />
          ))}
        </BodyArea>
        <FooterArea />
      </SideBar>
    </>
  );
};

export default MenuBar;
