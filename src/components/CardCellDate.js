import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${({ bg }) => bg};
  color: #333;
  width: 100%;
  font-size: 14px;
  white-space: nowrap;
  height: 1.5rem;
  border-bottom: 0px solid black;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CardCellDate = (props) => {
  const { date, bg } = props;
  return (
    <Container bg={bg}>
      {date}
    </Container>
  );
}

export default CardCellDate;
