import React, { useMemo } from 'react';
import { MdClose } from 'react-icons/md';

import { Container } from './styles';

interface FilterBoxProps {
  value: {[key: string]: string};
  handleDelete: Function;
}
const FilterBox: React.FC<FilterBoxProps> = ({ value, handleDelete }) => {
  const filterName = useMemo(() => {
    const [, name] = Object.entries(value)[0];

    return name;
  }, [value]);

  return (
    <Container>
      <h3>{filterName}</h3>
      <button type="button" onClick={() => handleDelete(value)}>
        <MdClose />
      </button>
    </Container>
  );
};

export { FilterBox };
