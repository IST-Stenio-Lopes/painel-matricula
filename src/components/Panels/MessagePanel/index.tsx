import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SeeAllButton } from '../../Forms/Buttons/SeeAllButton';
import MessageItem from './components/MessageItem';

import {
  Container,
  Header,
  Body,
  Footer,
} from './styles';

interface MessagePanelProps {
  gridRow?: string;
  gridColumn?: string;
  onClickItem: Function;
  data: any[];
}
const MessagePanel: React.FC<MessagePanelProps> = ({
  gridRow,
  gridColumn,
  onClickItem,
  data,
}) => {
  const navigate = useNavigate();

  return (
    <Container gridRow={gridRow} gridColumn={gridColumn}>
      <Header>
        <h2>Mensagens</h2>
      </Header>
      <Body>
        {data.map((item) => (
          <MessageItem
            handleClick={() => onClickItem(item)}
            key={item.id}
            avatar_url={item.avatar_url}
            name={item.name}
            msg={item.msg}
            time={item.time}
          />
        ))}
      </Body>
      <Footer>
        <SeeAllButton handleClick={() => navigate('/mensagens')}>Ver todas</SeeAllButton>
      </Footer>
    </Container>
  );
};

export { MessagePanel };
