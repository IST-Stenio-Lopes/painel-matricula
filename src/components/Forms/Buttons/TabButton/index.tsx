import React, { useMemo } from 'react';

import { Container, TabName, Indicator } from './styles';

interface TabButtonProps {
  tabName: string;
  selected: string;
  disabled?: boolean;
  handleSelected: (value: string) => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  tabName, selected, disabled = false, handleSelected,
}) => {
  const isSelected = useMemo(() => selected === tabName, [selected, tabName]);

  return (
    <Container onClick={() => handleSelected(tabName)} isSelected={isSelected} disabled={disabled}>
      <TabName>{tabName}</TabName>
      {isSelected && <Indicator />}
    </Container>
  );
};

export default TabButton;
