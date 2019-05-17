import React from 'react';
import styled from 'styled-components';

import CardCellDate from './CardCellDate';

const Cell = styled.div`
  background-color: ${({ afterCurrent }) => afterCurrent ? '#ccc' : '#33ccff'};
  ${({ current }) => current && 'background-color: #ffff99;'}
  ${({ type }) => (type === 1) && 'background-color: #00ff80;'}
  ${({ current, afterCurrent, type }) => (!current && type === 0 && !afterCurrent) && 'background-color: #fff;'}
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
  return (
    <Cell
      type={type}
      current={current}
      afterCurrent={afterCurrent}
      onMouseDown={onMouseDown}
    >
      <CardCellDate date={date} />
      <CellContent>
        {content}
      </CellContent>
    </Cell>
  );
}

export default CardCell;
