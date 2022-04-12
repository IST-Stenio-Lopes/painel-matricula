import React from 'react';
import { ReactComponent as FolderSvg } from '../../../../assets/icons/upload/folder.svg';

import { Container } from './styles';

interface ArchiveProps {
  name: string;
}

const ArchiveUploaded: React.FC<ArchiveProps> = ({ name }) => (
  <Container>
    <FolderSvg />
    <p>{name}</p>
  </Container>
);

export default ArchiveUploaded;
