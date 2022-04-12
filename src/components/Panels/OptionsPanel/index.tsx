import React, { useCallback, useEffect, useRef } from 'react';

import { Container, Panel } from './styles';

interface OptionsPanelProps {
  top?: string;
  onOutsideClick?: Function;
}

const OptionsPanel: React.FC<OptionsPanelProps> = ({ top = '-10px', onOutsideClick = () => {}, children }) => {
  const componentRef = useRef(null);

  const handleClickOutside = useCallback((e) => {
    if (
      componentRef
      && componentRef.current
    ) {
      const ref: any = componentRef.current;
      if (!ref.contains(e.target)) {
        onOutsideClick();
      }
    }
  }, [onOutsideClick]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, { capture: true });

    return () => {
      document.removeEventListener(
        'click',
        handleClickOutside,
        { capture: true },
      );
    };
  }, [handleClickOutside]);

  return (
    <Container top={top}>
      <Panel ref={componentRef}>
        {children}
      </Panel>
    </Container>
  );
};

export { OptionsPanel };
