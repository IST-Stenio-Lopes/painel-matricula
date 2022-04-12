import React, {

} from 'react';

import MenuTab from '../../../components/MenuTab';

import OpenClassrooms from './OpenClassrooms';
import OthersClassrooms from './OthersClassrooms';
import StartedClassrooms from './StartedClassrooms';

const ClassroomList: React.FC = () => (
  <MenuTab
    tabNames={['Disponíveis', 'Iniciadas', 'Outras']}
    tabScreens={[
      <OpenClassrooms />,
      <StartedClassrooms />,
      <OthersClassrooms />,
    ]}
  />
);

export default ClassroomList;
