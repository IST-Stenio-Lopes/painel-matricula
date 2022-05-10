import React from 'react';

import { Container } from './styles';

import { ReactComponent as FolderSvg } from '../../../../../../assets/icons/upload/folder.svg';
import TrashButton from '../../../../../../components/Forms/Buttons/TrashButton';

interface AttachmentProps {
  name: string;
  onRemove: () => void;
}

const Attachment: React.FC<AttachmentProps> = ({ name, onRemove }) => (
  <Container>
    <FolderSvg height={24} width={24} />
    <h3>{name}</h3>

    <TrashButton onClick={() => onRemove()} hasRipple={false} />
  </Container>
);

export default Attachment;
