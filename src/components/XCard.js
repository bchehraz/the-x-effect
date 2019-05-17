import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { GoCircleSlash } from 'react-icons/go';

import CardCell from './CardCell';

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

class XCard extends React.Component {
  constructor(props) {
    super(props);

    let cardState = [{}];
    let cardLength = 30;
    const TODAY = new Date();

    // TODO: Each Card must have its own START DATE variable to track what the first day is
    let startDate = new Date();
    startDate.setDate(TODAY.getDate() - 3);

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
    for (let i = 0; i < cardLength; i++) {

      dates[i] = {
        day: currentDay,
        dayName: DAY_NAMES[dayIndex],
        month: currentMonth,
      }

      //iterate the day number. If it's the maximum days in the month then reset back to 1
      if (currentDay === DAYS_IN_MONTH[currentMonth - 1]) {
        currentDay = 1;

        //If it's December, reset back to January
        if (currentMonth === 12) {
          currentMonth = 1;
        } else {
          currentMonth = currentMonth + 1;
        }
      } else {
        currentDay = currentDay + 1;
      }
      //Iterate dayIndex
      // Resets back to 0 after 6 since 7 days in the week
      if (dayIndex === 6) {
        dayIndex = 0;
      } else {
        dayIndex = dayIndex + 1;
      }
    }

    let todayIndex = -1;
    for (let j = 0; j < cardLength; j++) {
      let { dayName, month, day} = dates[j];
      let isToday = (TODAY.getDate() == day) && (TODAY.getMonth()+1 == month);
      if (isToday) todayIndex = j;
      cardState[j] = {
        type: 0,
        current: isToday,
        content: (todayIndex === -1) ? <GoCircleSlash size={'4rem'} style={{ color: '#ff003b'}}/> : <div />,
        date: dayName + " " + month + "/" + day,
      }
    }

    this.state = {
      status: cardState,
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


    //Save New Cell Data
    currentCell = {
      ...currentCell,
      type: newType,
      content: cellContent,
    }

    //Update the state's "status" at the specific cell index
    newStatus[index] = currentCell;

    //Update the state
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
          return (
            <CardCell
              key={index}
              type={cell.type}
              current={cell.current}
              afterCurrent={index > currentIndex}
              onMouseDown={() => this.toggleX(index)}
              date={cell.date}
              content={cell.content}
            />
          );
        })}
      </Container>
    );
  }
}

export default XCard;
