import React, { useCallback, useMemo, useState } from 'react';
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
  const [loading, setLoading] = useState(false);
  const itemArray = useMemo(() => {
    const temp: string[] = [];
    Object.entries(item).forEach(([key, value]) => {
      if (key !== 'object_id' && key !== 'extra') temp.push(value as any);
    });
    return temp;
  }, [item]);

  const onDelete = useCallback(async () => {
    setLoading(true);
    try {
      await handleDelete();
    } finally {
      setLoading(false);
    }
  }, [handleDelete]);

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
        && (
        <TrashButton
          loading={loading}
          onClick={(e: any) => { e.stopPropagation(); onDelete(); }}
        />
        )}
      </Content>
      )}
    </Container>
  );
};

export default ItemList;
