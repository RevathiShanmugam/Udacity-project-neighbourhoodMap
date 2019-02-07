import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './App.css';

class Sidebar extends Component {
  /* * Marker displayed when location from list item is clicked*/
  showMarker = locationName => {
    this.props.markers.map(marker => {
      if (marker.title === locationName) {
        window.google.maps.event.trigger(marker, "click")
      }
    })
  }
  render() {
      return (
          <Menu width={ '25%' } isOpen noOverlay >
          <div className="listOfVenues" aria-label="List of Venues">
          {this.props.venues.map(myVenue => (
          <li role="menuitem" aria-label={myVenue.venue.name} tabIndex="0"
          onClick={() => {this.showMarker(myVenue.venue.name);}}
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
