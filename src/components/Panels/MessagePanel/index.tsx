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
  data: any[];
}
const MessagePanel: React.FC<MessagePanelProps> = ({
  gridRow,
  gridColumn,
  data,
}) => {
  const navigate = useNavigate();

  return (
    <Container gridRow={gridRow} gridColumn={gridColumn}>
      <Header>
        <h2>Mensagens</h2>
      </Header>
      <Body>
        {data.map(({
          id,
          avatar_url,
          name,
          msg,
          time,
        }) => (
          <MessageItem
            handleClick={() => navigate('/mensagens/detalhes')}
            key={id}
            avatar_url={avatar_url}
            name={name}
            msg={msg}
            time={time}
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
