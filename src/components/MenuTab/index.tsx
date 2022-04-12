import React, { ReactNode, useEffect, useState } from 'react';
import TabButton from '../Forms/Buttons/TabButton';

import { Container, Header, Content } from './styles';

interface MenuTabProps {
  tabNames: string[];
  tabScreens: ReactNode[];
  disableButtons?: boolean;
}

const MenuTab: React.FC<MenuTabProps> = ({ tabNames, tabScreens, disableButtons = false }) => {
  const [selectedScreen, setSelectedScreen] = useState<string>(tabNames[0]);

  useEffect(() => {
    setSelectedScreen(tabNames[0]);
  }, [tabNames]);

  return (
    <Container>
      <Header>
        {tabNames.map((name, index) => (
          <TabButton
            key={name}
            disabled={tabNames.length <= 1 || (disableButtons && index !== 0)}
            tabName={name}
            selected={selectedScreen}
            handleSelected={() => setSelectedScreen(name)}
          />
        ))}
      </Header>
      <Content>
        {tabScreens[tabNames.indexOf(selectedScreen)]}
      </Content>
    </Container>
  );
};

export default MenuTab;
