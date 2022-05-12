import React, {
  ButtonHTMLAttributes, useCallback, useMemo, useState,
} from 'react';

import { FiMoreVertical } from 'react-icons/fi';
import { Container, Content } from './styles';

import { ReactComponent as OpenSvg } from '../../../../assets/icons/classroom/lock-open.svg';
import { ReactComponent as CloseSvg } from '../../../../assets/icons/classroom/lock-close.svg';

import { theme } from '../../../../global/styles/styles';
import Spinner from '../../../../components/Spinner';
import ActionsPanel from '../ActionsPanel';
import { StatusOfClassroom } from '../../../../interfaces/IClassroom';

export interface ActionButtonProps {
  name: string;
  status: string;
}

interface StatusButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  actionButtons: ActionButtonProps[];
  objectId: string;
  status?: string;
  handleClick?: (id: string, status: string) => void;
}

const StatusButton: React.FC<StatusButtonProps> = ({
  objectId, handleClick = () => {}, actionButtons, status = 'close', ...rest
}) => {
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [loading, setLoading] = useState(false);

  const setStatus = useCallback(async (newStatus) => {
    setLoading(true);

    await handleClick(objectId, newStatus);

    setLoading(false);
  }, [objectId, handleClick]);

  const actionsButtons = useMemo(
    () => actionButtons.map((item) => ({ ...item, onClick: () => setStatus(item.status) })),
    [actionButtons, setStatus],
  );

  const [selectedStatus, setSelectedStatus] = useState<string>(() => actionsButtons
    .find((item: any) => item.status === status)?.status || '');

  // [ Iniciada, Aberta, Fechada, Finalizada, Removido, Cancelada ]
  const renderIcon = useCallback(() => {
    switch (status) {
      case 'Fechada':
        return <CloseSvg color={theme.colors.secondary20} />;
      case 'Aberta':
        return <OpenSvg color={theme.colors.green} />;
      default:
        return <FiMoreVertical color={theme.colors.secondary70} size={20} />;
    }
  }, [status]);

  return (
    <>
      <Container
        {...rest}
        onClick={(e) => {
          e.stopPropagation(); setIsOpenOptions(!isOpenOptions);
        }}
      >
        {loading ? <Spinner /> : renderIcon()}
      </Container>
      {isOpenOptions && (
        <Content>
          <ActionsPanel
            actionsButtons={actionsButtons}
            setIsOpenOptions={setIsOpenOptions}
            selectedStatus={selectedStatus as string}
            setSelectedStatus={setSelectedStatus}
          />
        </Content>
      )}
    </>
  );
};

export default StatusButton;
