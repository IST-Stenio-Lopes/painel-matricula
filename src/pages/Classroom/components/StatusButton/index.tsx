import React, {
  ButtonHTMLAttributes, useCallback, useMemo, useState,
} from 'react';

import { Container, Content } from './styles';

import { ReactComponent as OpenSvg } from '../../../../assets/icons/classroom/lock-open.svg';
import { ReactComponent as CloseSvg } from '../../../../assets/icons/classroom/lock-close.svg';
import { ReactComponent as EndSvg } from '../../../../assets/icons/classroom/lock-end.svg';
import { theme } from '../../../../global/styles/styles';
import { OptionsPanel } from '../../../../components/Panels/OptionsPanel';
import { CurrentStatusButton } from '../CurrentStatusButton';
import Spinner from '../../../../components/Spinner';

interface StatusButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  classroomId: string;
  status?: string;
  handleClick?: Function;
}

const StatusButton: React.FC<StatusButtonProps> = ({
  classroomId, handleClick = () => {}, status = 'close', ...rest
}) => {
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [loading, setLoading] = useState(false);

  const setStatus = useCallback(async (newStatus) => {
    setLoading(true);

    await handleClick(classroomId, newStatus);

    setLoading(false);
  }, [classroomId, handleClick]);

  const actionsButtons = useMemo(() => [
    {
      name: 'Fechada',
      icon: CloseSvg,
      iconColor: theme.colors.secondary20,
      path: 'usuarios',
      onClick: () => setStatus('Fechada'),
    },
    {
      name: 'Aberta',
      icon: OpenSvg,
      iconColor: theme.colors.green,

      path: 'usuarios/detalhes',
      onClick: () => setStatus('Aberta'),
    },
    {
      name: 'Finalizada',
      icon: EndSvg,
      iconColor: theme.colors.secondary70,
      onClick: () => setStatus('Finalizada'),
    },
  ], [setStatus]);

  const [selectedStatus, setSelectedStatus] = useState(() => actionsButtons
    .find((item: any) => item.name === status)?.name);

  const renderIcon = useCallback(() => {
    switch (status) {
      case 'Fechada':
        return <CloseSvg color={theme.colors.secondary20} />;
      case 'Aberta':
        return <OpenSvg color={theme.colors.green} />;
      default:
        return <EndSvg color={theme.colors.secondary70} />;
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
      <OptionsPanel onOutsideClick={() => setIsOpenOptions(false)}>
        <Content>

          {actionsButtons.map(({
            name, icon, onClick, iconColor,
          }) => (
            <CurrentStatusButton
              key={name}
              name={name}
              icon={icon}
              iconColor={iconColor}
              handleClick={() => { onClick(); setIsOpenOptions(false); }}
              selectedStatus={selectedStatus as string}
              handleChangeStatus={setSelectedStatus}
            />
          ))}
        </Content>
      </OptionsPanel>
      )}
    </>
  );
};

export default StatusButton;
