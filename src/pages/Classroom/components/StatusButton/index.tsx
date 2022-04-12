import React, {
  ButtonHTMLAttributes, useCallback, useMemo, useState,
} from 'react';

import { Container, Content } from './styles';

import { ReactComponent as OpenSvg } from '../../../../assets/icons/classroom/lock-open.svg';
import { ReactComponent as CloseSvg } from '../../../../assets/icons/classroom/lock-close.svg';
import { ReactComponent as EndSvg } from '../../../../assets/icons/classroom/lock-end.svg';
import { theme } from '../../../../global/styles/styles';
import { OptionsPanel } from '../../../../components/Panels/OptionsPanel';
import { ActionButton } from '../../../../components/Profile/components/ActionButton';
import { CurrentStatusButton } from '../CurrentStatusButton';

interface StatusButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  status?: string;
}

const StatusButton: React.FC<StatusButtonProps> = ({ status = 'close', ...rest }) => {
  const [isOpenOptions, setIsOpenOptions] = useState(false);

  const actionsButtons = useMemo(() => [
    {
      name: 'Fechada',
      icon: CloseSvg,
      iconColor: theme.colors.secondary20,
      path: 'usuarios',
      onClick: () => {},
    },
    {
      name: 'Aberta',
      icon: OpenSvg,
      iconColor: theme.colors.green,

      path: 'usuarios/detalhes',
      onClick: () => {},
    },
    {
      name: 'Finalizada',
      icon: EndSvg,
      iconColor: theme.colors.secondary70,
      onClick: () => {},
    },
  ], []);

  const [selectedStatus, setSelectedStatus] = useState(actionsButtons[0].name);

  const renderIcon = useCallback(() => {
    switch (status) {
      case 'close':
        return <CloseSvg color={theme.colors.secondary20} />;
      case 'open':
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
        {renderIcon()}
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
              selectedStatus={selectedStatus}
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
