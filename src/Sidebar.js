import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './App.css';

class Sidebar extends Component {
  render() {
      return (
          <Menu width={ '25%' } isOpen noOverlay >
          <div className="listOfVenues" aria-label="List of Venues">
          {this.props.venues.map(myVenue => (
          <li role="menuitem" aria-label={myVenue.venue.name} tabIndex="0"
          id={myVenue.venue.id}
          key={myVenue.venue.id}>
          <b>{myVenue.venue.name}</b><br/>
          </li>))}
          </div>
          </Menu>
      );
  }
}

export default Sidebar;
