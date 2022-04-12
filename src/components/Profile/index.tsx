import React, { useEffect, useMemo, useState } from 'react';
import { useCallback } from 'react';
import { MdKeyboardArrowDown, MdOutlineNotifications } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Avatar from '../Avatar';

import { ReactComponent as EditProfileSvg } from '../../assets/icons/profile/edit-profile-icon.svg';
import { ReactComponent as AddUserSvg } from '../../assets/icons/profile/add-user-icon.svg';
import { ReactComponent as LogoutSvg } from '../../assets/icons/profile/logout-icon.svg';

import {
  Container,
  NotificationButton,
  Notification,
  TextArea,
  ProfileArea,
  Content,
} from './styles';

import { useAuth } from '../../hooks/auth';
import { theme } from '../../global/styles/styles';
import { OptionsPanel } from '../Panels/OptionsPanel';
import { ActionButton } from './components/ActionButton';
import { useModal } from '../../hooks/modal';

interface ProfileProps {
  hasNotification?: boolean;
}

const Profile: React.FC<ProfileProps> = ({ hasNotification = true }) => {
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const { configModal, handleVisible } = useModal();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = useCallback(() => {
    setIsOpenOptions(!isOpenOptions);
  }, [isOpenOptions]);

  const doSignOut = useCallback(async () => {
    await signOut();
  }, [signOut]);

  const handleSignOut = useCallback(() => {
    configModal(
      'Você deseja realmente sair da aplicação?',
      'logout',
      true,
      () => doSignOut(),
    );

    handleVisible();
  }, [handleVisible, doSignOut, configModal]);

  const actionsButtons = useMemo(() => [
    {
      name: 'Editar Perfil',
      icon: EditProfileSvg,
      path: 'usuarios/detalhes',
      onClick: () => navigate('usuarios/detalhes'),
    },
    {
      name: 'Usuários',
      icon: AddUserSvg,
      path: 'usuarios',
      onClick: () => navigate('usuarios'),
    },
    {
      name: 'Sair',
      icon: LogoutSvg,
      onClick: handleSignOut,
      color: theme.colors.primary50,
    },
  ], [handleSignOut, navigate]);

  return (
    <Container>
      <Content>
        <NotificationButton>
          {hasNotification && <Notification />}
          <MdOutlineNotifications />
        </NotificationButton>
        <ProfileArea onClick={handleClick}>
          <Avatar
            avatar_url={user && user.avatar_url}
            alt_name={user && user.name}

          />
          <TextArea>
            <h1>{`Bem Vindo, ${user && user.name}!`}</h1>
            <h2>{user && `${user.school_initials} - ${user.school_city} - ${user.school_estate}`}</h2>
          </TextArea>

          <MdKeyboardArrowDown color={theme.colors.secondary10} size={24} />
        </ProfileArea>
      </Content>
      {isOpenOptions && (
      <OptionsPanel onOutsideClick={() => setIsOpenOptions(false)}>
        {actionsButtons.map(({
          name, icon, color, onClick,
        }) => (
          <ActionButton
            key={name}
            name={name}
            icon={icon}
            color={color}
            handleClick={() => { onClick(); setIsOpenOptions(false); }}
          />
        ))}
      </OptionsPanel>
      )}
    </Container>
  );
};

export default Profile;
