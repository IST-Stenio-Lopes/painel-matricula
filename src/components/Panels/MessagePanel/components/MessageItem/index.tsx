import React from 'react';
import Avatar from '../../../../Avatar';

import {
  Container, AvatarArea, TextArea, TimeText, NameText, MessageText,
} from './styles';

interface MessageItemProps {
  avatar_url: string;
  name: string;
  msg: string;
  time: string;
  handleClick: Function;
}

const MessageItem: React.FC<MessageItemProps> = ({
  avatar_url,
  name,
  msg,
  time,
  handleClick,
}) => (
  <Container onClick={() => handleClick()}>
    <AvatarArea>
      <Avatar
        avatar_url={avatar_url}
        alt_name={name}
        size="64px"
      />
    </AvatarArea>
    <TextArea>
      <TimeText>{time}</TimeText>
      <NameText>{name}</NameText>
      <MessageText>
        {msg}
      </MessageText>
    </TextArea>
  </Container>
);

export default MessageItem;
