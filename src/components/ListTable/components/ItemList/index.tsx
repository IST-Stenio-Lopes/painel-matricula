import React, { useMemo } from 'react';
import TrashButton from '../../../Forms/Buttons/TrashButton';
import ColumnElement from '../ColumnElement';

import { Container, Content } from './styles';

interface ElementProps {
  item: any;
  columnGrid: string;
  indexToBold?: number;
  hasTrashButton?: boolean;
  handleClick?: Function;
  handleDelete?: Function;
}

const ItemList: React.FC <ElementProps> = ({
  item,
  indexToBold = 0,
  columnGrid,
  hasTrashButton = false,
  handleClick = () => {},
  handleDelete = () => {},
}) => {
  const itemArray = useMemo(() => {
    const temp: string[] = [];
    Object.entries(item).forEach(([key, value]) => {
      if (key !== 'object_id' && key !== 'extra') temp.push(value as any);
    });
    return temp;
  }, [item]);

  return (
    <Container
      columnGrid={columnGrid}
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
    >
      {itemArray.map((value, index) => (React.isValidElement(value)
        ? (
          <React.Fragment key={value}>
            {value}
          </React.Fragment>
        )
        : (
          <ColumnElement
            key={value}
            value={value}
            isBold={index === indexToBold}
          />
        )
      ))}
      {(hasTrashButton || !!item.extra)
      && (
      <Content>
        {item.extra && item.extra}
        {hasTrashButton
        && <TrashButton onClick={(e: any) => { e.stopPropagation(); handleDelete(); }} />}
      </Content>
      )}
    </Container>
  );
};

export default ItemList;
