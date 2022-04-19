/* eslint-disable no-nested-ternary */
import React, {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useMemo, useState,
} from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { NavButton } from '../Forms/Buttons/NavButton';
import { SelectOptions } from '../Forms/SelectLine';
import ColumnTitle from './components/ColumnTitle';
import ItemList from './components/ItemList';

import {
  Body,
  Container,
  Footer,
  ButtonsNavArea,
  TitleHeader,
  Header,
  InfoPageText,
  SkeletonContent,
  NoItemsText,
} from './styles';

export interface TitleProps {
  id: string;
  name: string,
  hasSorting: boolean,
  hasFilter: boolean,
  growFactor: string,
  filterOptions?: SelectOptions[],
}

export interface ItemProps {
  [key: string]: string | ReactNode;
}

interface ListTableProps {
  listTitles: TitleProps[];
  listItems?: ItemProps[];
  currentPage: number;
  itemsPerPages: number;
  totalOfItems: number;
  hasTrashButton?: boolean;
  title?: string;
  subtitle?: string;
  indexToBold?: number;
  gridColumn?: string;
  gridRow?: string;
  onClickItem?: Function;
  onRemoveItem?: Function;
  onSortChange?: Function;
  changePage?: Function;

}

const ListTable: React.FC<ListTableProps> = ({
  title,
  subtitle,
  listTitles,
  listItems,
  currentPage,
  totalOfItems,
  itemsPerPages,
  hasTrashButton = true,
  indexToBold = 0,
  gridColumn,
  gridRow,
  onRemoveItem = () => {},
  onClickItem = () => {},
  onSortChange = () => {},
  changePage = () => {},
}) => {
  const [selectedSortingType, setSelectedSortingType] = useState('');
  const [selectedSorting, setSelectedSorting] = useState('');

  const gridTemplateColumn = useMemo(() => {
    let grid = '';

    listTitles.forEach((item) => {
      grid += `${item.growFactor} `;
    });

    if (hasTrashButton || (listItems && listItems[0]?.extra)) grid += 'minmax(150px, 1fr)';
    return grid;
  }, [listTitles, hasTrashButton, listItems]);

  const infoPage = useMemo(() => {
    let rightValue = currentPage * itemsPerPages;
    rightValue = rightValue >= totalOfItems ? totalOfItems : rightValue;

    const leftValue = rightValue === totalOfItems
      ? rightValue - ((rightValue % itemsPerPages) - 1)
      : rightValue - 9;

    return `${leftValue}-${rightValue} de ${totalOfItems}`;
  }, [currentPage, itemsPerPages, totalOfItems]);

  const handleChange = useCallback((next: boolean) => {
    let totalOfPages = Math.floor(totalOfItems / itemsPerPages);
    totalOfPages = totalOfPages <= 1 ? 1 : totalOfPages;

    let page = currentPage;
    if (next) {
      page++;
      changePage(page > totalOfPages ? totalOfPages : page);
    } else {
      page--;
      changePage(page <= 1 ? 1 : page);
    }
  }, [changePage, currentPage, itemsPerPages, totalOfItems]);

  const separator = useCallback(({ children }: PropsWithChildren<unknown>) => (
    <SkeletonContent>
      {children}
    </SkeletonContent>
  ), []);

  useEffect(() => {
    onSortChange(selectedSortingType, selectedSorting);
  }, [onSortChange, selectedSorting, selectedSortingType]);

  return (
    <Container gridColumn={gridColumn} gridRow={gridRow}>
      {title
        && (
        <TitleHeader>
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
        </TitleHeader>
        )}
      <Header gridTemplateColumn={gridTemplateColumn}>
        {listTitles.map(({ name, hasSorting }) => (
          <ColumnTitle
            key={name}
            name={name}
            hasSorting={hasSorting}
            selectedSortingType={selectedSortingType}
            selectedSorting={selectedSorting}
            handleSelectSorting={setSelectedSorting}
            handleSelectSortingType={setSelectedSortingType}
          />
        ))}
      </Header>
      <Body hasTitle={!!title}>
        {listItems
          ? (listItems.length > 0
            ? listItems.map((item) => (
              <ItemList
                key={item.object_id as string}
                columnGrid={gridTemplateColumn}
                item={item}
                indexToBold={indexToBold}
                hasTrashButton={hasTrashButton}
                handleClick={() => onClickItem(item)}
                handleDelete={() => onRemoveItem(item.object_id)}
              />
            ))
            : <NoItemsText>Nenhum dado foi registrado até o momento</NoItemsText>
          )
          : (
            <Skeleton count={10} height={50} wrapper={separator} />
          )}
      </Body>
      <Footer>
        <InfoPageText>
          {infoPage}
        </InfoPageText>
        <ButtonsNavArea>
          <NavButton direction="back" onClick={() => handleChange(false)} />
          <NavButton direction="next" onClick={() => handleChange(true)} />
        </ButtonsNavArea>
      </Footer>
    </Container>
  );
};

export default ListTable;
