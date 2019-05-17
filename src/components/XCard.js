import React from 'react';
import styled from 'styled-components';

import { FaTimes } from 'react-icons/fa';
import { GoCircleSlash } from 'react-icons/go';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 4rem);
  grid-template-rows: repeat(6, 5.5rem);
  justify-items: center;
  align-items: center;
  justify-content: center;
  grid-auto-flow: row;
  max-width: auto;
  grid-gap: 5px;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
`;

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

const CellDate = styled.div`
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

const CellContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: auto;
  height: 100%;
`;

class XCard extends React.Component {
  constructor(props) {
    super(props);

    let initCardState = [{}];
    let initLength = 30;
    //testing variables
    const TODAY = new Date();
    let startDate = new Date();
    startDate.setDate(TODAY.getDate() - 3);

    // load in sample Date data
    let dates = [{}];
    const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // REFERENCE:
    // get today's day index- date.getDay()
    // get today's day value- String(date.getDate().padStart(2, '0'))
    // get today's month number- String(today.getMonth() + 1).padStart(2, '0')
    // get today's month index- startDate.getMonth()
    // get today's date- let today = new Date()
    //let today = new Date();
    //let dayNum = String(today.getDate()).padStart(2, '0');
    //let monthNum = String(today.getMonth() + 1).padStart(2, '0');

    //iterators
    let currentDay = startDate.getDate(); // value of 1 - DAYS_IN_MONTH
    let dayIndex = startDate.getDay(); // value of 0-6
    let currentMonth = startDate.getMonth() + 1; //value of 1 - 12

    //The purpose of this is to generate days of the month to output to the card
    // at a later time, the startDate variable would have to be received via API
    for (let i = 0; i < initLength; i++) {

      dates[i] = {
        day: currentDay,
        dayName: DAY_NAMES[dayIndex],
        month: currentMonth,
      }

      //iterate to the next day
      if (currentDay === DAYS_IN_MONTH[currentMonth - 1]) {
        //if at the end of a month, reset back to 0 and iterate month
        currentDay = 1;
        if (currentMonth === 12) {
          currentMonth = 1;
        } else {
          currentMonth = currentMonth + 1;
        }
      } else {
        currentDay = currentDay + 1;
      }
      //iterate day index (to retreive Sun, Mon, etc.)
      if (dayIndex === 6) {
        dayIndex = 0;
      } else {
        dayIndex = dayIndex + 1;
      }
    }

    console.log("Today's Day #: " + TODAY.getDate());
    console.log("Today's Month #: " + (TODAY.getMonth() + 1));
    let todayIndex = -1;
    for (let j = 0; j < initLength; j++) {
      let { dayName, month, day} = dates[j];
      let isToday = (TODAY.getDate() == day) && (TODAY.getMonth()+1 == month);
      if (isToday) todayIndex = j;
      initCardState[j] = {
        type: 0,
        current: isToday,
        content: (todayIndex === -1) ? <GoCircleSlash size={'4rem'} style={{ color: '#ff003b'}}/> : <div />,
        date: dayName + " " + month + "/" + day,
      }
    }

    this.state = {
      status: initCardState,
      currentIndex: todayIndex,
    }

    this.toggleX = this.toggleX.bind(this);
  }

  toggleX(index) {
    //update grid status
    let newStatus = this.state.status;
    let currentCell = newStatus[index];
    let cellContent = currentCell.content;
    let newType = 0;

    let afterCurrent = false;
    if (index > this.state.currentIndex) {
      afterCurrent = true;
    }

    if (afterCurrent) {
      return;
    }

    if (currentCell.type === 0) {
      newType = 1;
      cellContent = (<FaTimes size={'4rem'} style={{ color: '#333', }}/>);
    } else if (currentCell.type === 1) {
      newType = 0;
      if (currentCell.current) {
        cellContent = <div />;
      } else {
        cellContent = <GoCircleSlash size={'4rem'} style={{ color: '#ff003b'}}/>;
      }
    }

    currentCell = {
      ...currentCell,
      type: newType,
      content: cellContent,
    }

    newStatus[index] = currentCell;

    this.setState({
      ...this.state,
      status: newStatus,
    });
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

          /*
          <Cell
              key={index}
              type={cell.type}
              current={cell.current}
              afterCurrent={afterCurrent}
              onMouseDown={() => this.toggleX(index)}
            >
            {cell.content}
          </Cell>
          */
          return <Cell
              key={index}
              type={cell.type}
              current={cell.current}
              afterCurrent={afterCurrent}
              onMouseDown={() => this.toggleX(index)}
            >
              <CellDate current={cell.current}>{cell.date}</CellDate>
              <CellContent>
                {cell.content}
              </CellContent>
          </Cell>
        })}
      </Container>
    );
  }
}

export default XCard;
