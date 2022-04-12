import { FormHandles } from '@unform/core';
import React, { useCallback, useRef, useState } from 'react';
import { TitleProps } from '../../../../ListTable';
import { OptionsPanel } from '../../../../Panels/OptionsPanel';
import { Button } from '../../../Buttons/Button';
import SelectLine from '../../../SelectLine';

import wrapperNames from '../../../../../utils/wrapper.json';

import { ButtonArea, Container, FormContent } from './styles';

interface FiltersPanelProps {
  showPanel: (show:boolean) => void;
  listFilters?: TitleProps[];
  applyFilters: Function;
  filtersApplied: {[key: string]: string}[];
  onSubmitFilters: Function;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  showPanel, listFilters, applyFilters, filtersApplied, onSubmitFilters,
}) => {
  const [tempFilters, setTempFilters] = useState<{[key: string]: string}[]>([]);
  const filtersSelectRef = useRef<FormHandles>(null);

  const handleSelectChange = useCallback((value, name: string) => {
    const currentFilter = { [name]: value.label };
    const temp = [...tempFilters];

    const findFilter = temp.find((filter) => filter[name]);

    if (findFilter) {
      const index = temp.indexOf(findFilter);
      temp[index] = currentFilter;
    } else {
      temp.push(currentFilter);
    }

    setTempFilters(temp);
  }, [tempFilters]);

  const handleApplyFilters = useCallback(() => {
    applyFilters(tempFilters);
    showPanel(false);
    onSubmitFilters();
  }, [applyFilters, showPanel, tempFilters, onSubmitFilters]);

  const setDefaultValue = useCallback((key) => {
    const filter = filtersApplied.find((value) => value[key]);

    if (filter) {
      return ({ value: filter[key], label: filter[key] });
    }
    return null;
  }, [filtersApplied]);

  return (
    <Container>
      <OptionsPanel top="-5px" onOutsideClick={() => showPanel(false)}>
        <FormContent ref={filtersSelectRef} onSubmit={handleApplyFilters}>
          {listFilters && listFilters.filter((item) => item.hasFilter)
            .map(({ id, name, filterOptions }) => (
              <SelectLine
                key={id}
                name={wrapperNames[name as never]}
                label={name}
                options={filterOptions}
                defaultValue={() => setDefaultValue(wrapperNames[name as never])}
                onChange={(value) => handleSelectChange(value, wrapperNames[name as never])}
              />
            ))}
        </FormContent>
        <ButtonArea>
          <Button
            styleType="outline"
            maxWidth="33.33%"
            minHeight="36px"
            onClick={() => showPanel(false)}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => filtersSelectRef.current?.submitForm()}
            maxWidth="33.33%"
            minHeight="36px"
          >
            Aplicar
          </Button>
        </ButtonArea>
      </OptionsPanel>
    </Container>
  );
};

export { FiltersPanel };
