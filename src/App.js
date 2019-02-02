import React, { Component } from 'react';
import ListComponent from './ListComponent';
import MapComponent from './MapComponent';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="list-container">
          <h2>Neighborhood Map</h2>
          <ListComponent/>
        </div>
        <div className="map-container">
          <MapComponent/>
        </div>
      </div>
    )
  }
}

export default App;
