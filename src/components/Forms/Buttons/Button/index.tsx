/* eslint-disable no-nested-ternary */
import React, {
  ButtonHTMLAttributes, ReactNode, useEffect, useMemo, useState,
} from 'react';
import Spinner from '../../../Spinner';

import {
  Container,
} from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  styleType?: 'filled' | 'outline';
  hasCountdown?: boolean;
  color?: string;
  hasOutline?: boolean;
  loading?: boolean;
  width?: string;
  maxHeight?: string;
  minHeight?: string;
  maxWidth?: string;
  gridColumn?: string;
  gridRow?: string;
  leftIcon?: ReactNode;
  iconWithMargin?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = (
  {
    styleType = 'filled',
    children,
    color,
    disabled = false,
    hasCountdown = false,
    hasOutline = true,
    loading = false,
    iconWithMargin = true,
    gridColumn,
    gridRow,
    width = '100%',
    maxHeight,
    maxWidth,
    minHeight,
    leftIcon: LeftIcon,
    ...rest
  },
) => {
  const [time, setTime] = useState(5);
  const [countdown, setCountdown] = useState(hasCountdown);
  const [isDisable, setIsDisable] = useState(disabled);

  const spinner = useMemo(() => <Spinner />, []);

  useEffect(() => {
    if (countdown) {
      setIsDisable(true);
      let timer = time;
      const start = setInterval(() => {
        if (timer === 0) {
          clearInterval(start);
          setIsDisable(false);
          setCountdown(false);
          return;
        }

        timer--;
        setTime(timer);
      }, 1000, timer);
    }
  }, [time, setTime, hasCountdown, countdown]);

  return (
    <Container
      type="button"
      color={color}
      hasOutline={hasOutline}
      iconWithMargin={iconWithMargin}
      styleType={styleType}
      width={width}
      minHeight={minHeight}
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      gridColumn={gridColumn}
      gridRow={gridRow}
      disabled={isDisable || loading}
      {...rest}
    >
      {LeftIcon && LeftIcon}
      {countdown ? time
        : loading ? <Spinner /> : children}
    </Container>

  );
};
