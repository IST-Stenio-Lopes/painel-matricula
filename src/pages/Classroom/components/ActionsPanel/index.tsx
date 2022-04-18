import React from 'react';
import { OptionsPanel } from '../../../../components/Panels/OptionsPanel';
import { CurrentStatusButton } from '../CurrentStatusButton';

import { Container, Content } from './styles';

interface ActionsPanelProps {
  actionsButtons: any[];
  setIsOpenOptions: (value: boolean) => void;
  setSelectedStatus: (value: string) => void;
  selectedStatus: string
}

const ActionsPanel: React.FC<ActionsPanelProps> = ({
  actionsButtons,
  setIsOpenOptions,
  selectedStatus,
  setSelectedStatus,
}) => (
  <Container>
    <OptionsPanel
      onOutsideClick={() => setIsOpenOptions(false)}
      left="-214px"
    >
      <Content>

        {actionsButtons.map(({
          name, onClick,
        }) => (
          <CurrentStatusButton
            key={name}
            name={name}
            handleClick={() => { onClick(); setIsOpenOptions(false); }}
            selectedStatus={selectedStatus as string}
            handleChangeStatus={setSelectedStatus}
          />
        ))}
      </Content>
    </OptionsPanel>
  </Container>
);

export default ActionsPanel;
