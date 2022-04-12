import React from 'react';
import { TitleProps } from '../..';
import SearchInput from '../../../Forms/SearchInput';

import { Container, Content } from './styles';

interface ListSearchAreaProps {
  listFilters?: TitleProps[];
  setKeywords?: Function;
  searchValue?: string;
  handleChange?: (value: string) => void;
  onSubmit?: Function;
}

const ListSearchArea: React.FC<ListSearchAreaProps> = ({
  listFilters,
  searchValue,
  setKeywords = () => {},
  onSubmit = () => {},
  handleChange = () => {},
  children,
}) => (
  <Container>
    <Content>
      <SearchInput
        listFilters={listFilters}
        placeHolder="Pesquisar"
        setKeyWords={setKeywords}
        onBlur={() => onSubmit()}
        value={searchValue}
        onChange={(e) => handleChange(e.target.value)}
        onSubmitFilters={onSubmit}
      />
    </Content>
    {children}
  </Container>
);

export default ListSearchArea;
