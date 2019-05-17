import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #333;
  color: #fff;
  width: 100%;
  font-size: 14px;
  white-space: nowrap;
  height: 1.5rem;
  border-bottom: 2px solid black;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CardCellDate = (props) => {
  const { date } = props;
  return (
    <Container>
      {date}
    </Container>
  );
}

export default CardCellDate;
