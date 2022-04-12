import React, { useMemo } from 'react';
import { theme } from '../../global/styles/styles';

import {
  Container, Label, Background, ForegroundBar,
} from './styles';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label,
  color,
}) => {
  const currentValue = useMemo(() => (current * 100) / total, [current, total]);

  const foregroundColor = useMemo(() => {
    if (currentValue < 50) return theme.colors.red;
    if (currentValue < 90) return theme.colors.yellow;
    return theme.colors.green;
  }, [currentValue]);

  return (
    <Container>
      <Background hasLabel={!!label}>
        <ForegroundBar width={`${currentValue}%`} color={color || foregroundColor} />
      </Background>
      {label
    && <Label>{label}</Label>}
    </Container>
  );
};

export default ProgressBar;
