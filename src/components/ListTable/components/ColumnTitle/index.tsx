import React, { useCallback, useEffect, useState } from 'react';

import { ReactComponent as DropUpIcon } from '../../../../assets/icons/dropup-icon.svg';
import { ReactComponent as DropDownIcon } from '../../../../assets/icons/dropdown-icon.svg';
import { Container, SortingArea } from './styles';
import { theme } from '../../../../global/styles/styles';

interface ColumnTitleProps {
  name: string;
  hasSorting?: boolean;
  selectedSortingType: string;
  selectedSorting: string;
  handleSelectSortingType: (value : string) => void;
  handleSelectSorting: (value : string) => void;
}
type SortingType = '' | 'Crescente' | 'Decrescente' ;

const ColumnTitle: React.FC<ColumnTitleProps> = ({
  name,
  selectedSortingType,
  selectedSorting,
  hasSorting = true,
  handleSelectSortingType,
  handleSelectSorting,
}) => {
  const [currentSorting, setCurrentSorting] = useState<SortingType>('');

  const setSorting = useCallback((value: string) => {
    setCurrentSorting(value as SortingType);
    handleSelectSorting(value);
  }, [handleSelectSorting]);

  const handleChangeSorting = useCallback(() => {
    handleSelectSortingType((selectedSortingType === name && selectedSorting === '')
      ? '' : name);

    let newSorting: string;
    if (currentSorting === '') newSorting = 'Crescente';
    else if (currentSorting === 'Crescente') newSorting = 'Decrescente';
    else { newSorting = ''; handleSelectSortingType(''); }

    setSorting(newSorting);
  }, [
    handleSelectSortingType,
    selectedSortingType,
    name,
    selectedSorting,
    currentSorting,
    setSorting,
  ]);

  const dropStyle = useCallback((value) => ({
    color: currentSorting === value
      ? theme.colors.secondary100
      : theme.colors.secondary70,
  }), [currentSorting]);

  useEffect(() => {
    if (selectedSortingType !== name) setCurrentSorting('');
  }, [selectedSortingType, name]);

  return (
    <Container
      hasSorting={hasSorting}
      onClick={() => handleChangeSorting()}
    >
      <h2>{name}</h2>
      {hasSorting && (
      <SortingArea>
        <DropUpIcon style={dropStyle('Crescente')} />
        <DropDownIcon style={dropStyle('Decrescente')} />
      </SortingArea>
      )}
    </Container>
  );
};

export default ColumnTitle;
