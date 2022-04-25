import React, { useMemo } from 'react';

import {
  Container, TabName, Indicator, NotificationCount,
} from './styles';

interface TabButtonProps {
  tabName: string;
  selected: string;
  totalNotification?: number;
  disabled?: boolean;
  handleSelected: (value: string) => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  tabName, selected, disabled = false, handleSelected, totalNotification = 0,
}) => {
  const isSelected = useMemo(() => selected === tabName, [selected, tabName]);

  return (
    <Container onClick={() => handleSelected(tabName)} isSelected={isSelected} disabled={disabled}>
      <TabName>{tabName}</TabName>
      {isSelected && <Indicator />}
      {totalNotification > 0 && (
      <NotificationCount>
        <h2>{totalNotification >= 99 ? '99+' : totalNotification}</h2>
      </NotificationCount>
      )}
    </Container>
  );
};

export default TabButton;
