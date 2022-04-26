import React, {
  ChangeEvent, useMemo, useRef,
} from 'react';
import { theme } from '../../global/styles/styles';
import { IUser } from '../../interfaces/IUser';
import { IStudent } from '../../pages/Enrollment/NewEnrollment/FormEnrollment/data/types';
import Avatar from '../Avatar';
import { Button } from '../Forms/Buttons/Button';

import {
  Container, Title, Subtitle, Content, TextArea, ButtonArea,
} from './styles';

interface UserInfoProps {
  user?: IUser;
  student?: IStudent;
  handleChangePhoto?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ user, student, handleChangePhoto = () => {} }) => {
  const inputRef = useRef<any>(null);
  const name = useMemo(() => {
    if (user) {
      return user?.name || 'Nome';
    }

    return student?.name || 'Nome';
  }, [student, user]);

  const avatarUrl = useMemo(() => {
    if (user) {
      return user?.avatar_url || '';
    }

    return student?.avatar || 'Nome';
  }, [student, user]);

  const role = useMemo(() => {
    if (user) {
      return user?.role_name || 'Nível de Acesso';
    }

    return 'Aluno';
  }, [user]);

  return (
    <Container>
      <Content>
        <TextArea>
          <Title>{name}</Title>
          <Subtitle>{role}</Subtitle>
        </TextArea>
        <Avatar size="120px" avatar_url={avatarUrl} alt_name={name} />
      </Content>
      <ButtonArea>
        <input style={{ display: 'none' }} ref={inputRef} type="file" id="avatar" accept="image/png image/jpg" onChange={handleChangePhoto} />
        <Button hasOutline={false} styleType="outline" minHeight="40px" onClick={() => inputRef.current?.click()}>Adicionar Foto</Button>
        <Button color={theme.colors.secondary20} hasOutline={false} styleType="outline" minHeight="40px">Remover Foto</Button>
      </ButtonArea>
    </Container>
  );
};

export default UserInfo;
