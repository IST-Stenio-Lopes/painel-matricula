import React from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import {
  Container,
} from './styles';

interface BackButtonProps {
  color?: string;
  position?: string;
  label: string;
  handleBack(): void;
}

const BackButton: React.FC<BackButtonProps> = ({
  color, position, handleBack, label,
}) => (
  <Container color={color} onClick={handleBack} position={position}>
    <MdKeyboardArrowLeft size={24} />
    <h1>{label}</h1>
  </Container>
);

export default BackButton;
