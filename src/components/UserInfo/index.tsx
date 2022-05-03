import React, {
  ChangeEvent, useMemo, useRef,
} from 'react';
import { IUser } from '../../interfaces/IUser';
import { IStudent } from '../../pages/Enrollment/NewEnrollment/FormEnrollment/data/types';
import Avatar from '../Avatar';
import { Button } from '../Forms/Buttons/Button';

import {
  Container, Title, Subtitle, Content, TextArea, ButtonArea,
} from './styles';

interface UserInfoProps {
  name?: string;
  user?: IUser;
  student?: IStudent;
  img?: any;
  handleChangePhoto?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({
  name = 'Nome', user, student, img, handleChangePhoto = () => {},
}) => {
  const inputRef = useRef<any>(null);
  const avatarUrl = useMemo(() => {
    if (user) {
      return user?.avatar_url;
    }

    return student?.avatar;
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
        <Avatar size="120px" imgFile={img} avatar_url={avatarUrl} alt_name={name} />
      </Content>
      <ButtonArea>
        <input style={{ display: 'none' }} ref={inputRef} type="file" id="avatar" accept=".png, .jpg, .jpeg" onChange={handleChangePhoto} />
        <Button hasOutline={false} styleType="outline" minHeight="40px" onClick={() => inputRef.current?.click()}>Adicionar Foto</Button>
      </ButtonArea>
    </Container>
  );
};

export default UserInfo;
