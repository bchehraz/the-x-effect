import React from 'react';
import styled from 'styled-components';

class CardList extends React.Component {
  constructor(props) {
    super(props);

    // Set initial props since there's no previous data to load yet
    this.state = {
      Cards: [{
        // status: Array of Objects
        // currentIndex: Integer
        // startDate: Date
        // archived: Boolean
      }],
    }
  }

  render() {
    return (
      <div />
    );
  }
}

export default CardList;
