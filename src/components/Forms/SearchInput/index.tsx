import React, {
  InputHTMLAttributes, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { MdOutlineSearch, MdOutlineFilterList } from 'react-icons/md';

import {
  Container, Content, FiltersContent, SearchContent,
} from './styles';

import { theme } from '../../../global/styles/styles';
import { TitleProps } from '../../ListTable';
import { FilterBox } from './components/FilterBox';
import { FiltersPanel } from './components/FiltersPanel';
import LinkButton from '../Buttons/LinkButton';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  placeHolder: string;
  listFilters?: TitleProps[];
  setKeyWords?: Function;
  onSubmitFilters: Function;
}

const SearchInput: React.FC<InputProps> = ({
  placeHolder, listFilters = [], setKeyWords = () => {}, onSubmitFilters = () => {}, ...rest
}) => {
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState<{[key: string]: string}[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const removeFilter = useCallback((filter) => {
    const temp = filtersApplied.filter((currentFilter) => currentFilter !== filter);

    setFiltersApplied(temp);
  }, [filtersApplied]);

  const removeAllFilters = useCallback(() => {
    setFiltersApplied([]);
  }, []);

  const hasFilters = useMemo(() => listFilters
  && listFilters.filter((item) => item.hasFilter).length > 0, [listFilters]);

  useEffect(() => {
    const keywords = filtersApplied.map(
      (value) => `:${Object.values(value)[0]}`,
      [],
    );
    setKeyWords(keywords);
  }, [filtersApplied, setKeyWords]);

  return (
    <SearchContent>
      <Container>
        <Content isFilled={isFilled} isFocused={isFocused}>
          <MdOutlineSearch size={20} color={theme.colors.secondary60} />
          <input
            onKeyPress={handleKeyPress}
            placeholder={placeHolder}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            type="search"
            ref={inputRef}
            {...rest}
          />
          { hasFilters && (
            <button type="button" onClick={() => setIsOpenOptions(!isOpenOptions)}>
              <MdOutlineFilterList size={20} color={theme.colors.primary50} />
            </button>
          )}
        </Content>
        { isOpenOptions && (
        <FiltersPanel
          showPanel={setIsOpenOptions}
          listFilters={listFilters}
          applyFilters={setFiltersApplied}
          filtersApplied={filtersApplied}
          onSubmitFilters={onSubmitFilters}
        />
        )}
      </Container>

      {filtersApplied && (
      <FiltersContent>
        {filtersApplied.map((filter) => (
          <FilterBox key={filter[0]} value={filter} handleDelete={removeFilter} />
        ))}

        {filtersApplied.length > 0 && (
        <LinkButton
          color={theme.colors.secondary100}
          onClick={removeAllFilters}
        >
          Limpar tudo
        </LinkButton>
        )}
      </FiltersContent>
      )}
    </SearchContent>
  );
};

export default SearchInput;
