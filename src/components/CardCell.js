import React from 'react';
import styled from 'styled-components';

import CardCellDate from './CardCellDate';

const Cell = styled.div`
  background-color: ${({ bg }) => bg};
  width: 100%;
  height: 100%;
  border: 1px solid #333;

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
`;

const CellContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: auto;
  height: 100%;
`;

const CardCell = (props) => {
  const { type, current, afterCurrent, onMouseDown, date, content } = props;

  let color = '#33ccff';


  if (afterCurrent) {
    color = '#ccc';
  } else if (current) {
    color = '#33ccff';
  } else {
    color = '#fff';
  }

  if (type === 1) {
    color = '#00ff80';
  }

  return (
    <Cell
      onMouseDown={onMouseDown}
      bg={color}
    >
      <CardCellDate date={date} type={type} bg={color} />
      <CellContent>
        {content}
      </CellContent>
    </Cell>
  );
}

export default CardCell;
