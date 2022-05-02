import React, { useMemo } from 'react';

import { ReactComponent as LogoutImg } from '../../assets/modal/logout-img.svg';
import { ReactComponent as MessageImg } from '../../assets/modal/message-img.svg';
import { ReactComponent as SaveDataImg } from '../../assets/modal/save-data-img.svg';
import { ReactComponent as StatusImg } from '../../assets/modal/status-img.svg';
import { ReactComponent as DeleteImg } from '../../assets/modal/delete-img.svg';
import { ReactComponent as ErrorImg } from '../../assets/modal/error-img.svg';
import { ReactComponent as SuccessImg } from '../../assets/modal/success-img.svg';

import {
  Container,
  Content,
  Body,
  Footer,
} from './styles';
import { Button } from '../Forms/Buttons/Button';

interface ModalProps {
  description:string;
  hasQuestion?: boolean;
  hasCountdown?: boolean;
  handleDismiss: () => void;
  handleYes: () => void;
  handleNo: () => void;
  iconType?: string;
}
const Modal: React.FC<ModalProps> = ({
  description,
  hasQuestion = false,
  hasCountdown = false,
  handleDismiss,
  handleYes,
  handleNo,
  iconType = 'success',
}) => {
  const renderImg = useMemo(() => {
    const size = '60%';

    switch (iconType) {
      case 'delete':
        return <DeleteImg width={size} />;
      case 'save':
        return <SaveDataImg width={size} />;
      case 'message':
        return <MessageImg width={size} />;
      case 'status':
        return <StatusImg width={size} />;
      case 'logout':
        return <LogoutImg width={size} />;
      case 'success':
        return <SuccessImg width={size} />;
      default:
        return <ErrorImg width={size} />;
    }
  }, [iconType]);

  return (
    <Container>
      <Content>
        <Body>
          {renderImg}
          <h1>{description}</h1>
        </Body>
        <Footer>
          {!hasQuestion ? (
            <Button
              minHeight="50px"
              maxWidth="40%"
              onClick={() => handleDismiss()}
            >
              OK
            </Button>
          )
            : (
              <>
                <Button
                  styleType="outline"
                  minHeight="50px"
                  maxWidth="40%"
                  onClick={() => handleNo()}
                >
                  Cancelar
                </Button>
                <Button
                  hasCountdown={hasCountdown}
                  minHeight="50px"
                  maxWidth="40%"
                  onClick={() => handleYes()}
                >
                  Sim
                </Button>
              </>
            )}
        </Footer>
      </Content>
    </Container>
  );
};

export default Modal;
