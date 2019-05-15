import React from 'react';
import styled from 'styled-components';

import { FaCheck } from 'react-icons/fa';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 4rem);
  grid-template-rows: repeat(6, 4rem);
  justify-items: center;
  align-items: center;
  justify-content: center;
  grid-auto-flow: row;
  max-width: 20rem;
`;

const Cell = styled.div`
  background-color: ${({ afterCurrent }) => afterCurrent ? '#33ccff' : '#ccc'};
  ${({ current }) => current && 'background-color: #ffff99'};
  width: 100%;
  height: 100%;
  border: 2px solid #333;
`;

class XCard extends React.Component {
  constructor(props) {
    super(props);

    let initCardState = [{}];
    let initLength = 30;
    //testing variables
    let current = 13;
    for (let i = 0; i < initLength; i++) {
      initCardState[i] = {
        type: 0,
        current: (current === i) ? true : false,
      }
    }

    this.state = {
      status: initCardState,
      currentIndex: current,
    }
  }
  render() {
    const { status, currentIndex } = this.state;
    return (
      <Container>
        {status.map((cell, index) => {
          //check if the current element falls before or after the "current"
          let afterCurrent = false;
          if (index > currentIndex) {
            afterCurrent = true;
          }
          console.log("AfterCurrent value: " + index + " => " + afterCurrent);
          return <Cell
            key={index}
            type={cell.type}
            current={cell.current}
            afterCurrent={afterCurrent}
          />
        })}
      </Container>
    );
  }
}

export default XCard;
