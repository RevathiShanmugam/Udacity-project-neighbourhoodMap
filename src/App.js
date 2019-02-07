import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Map from './Map';
import Header from './Header';
import './App.css';

class App extends Component {
  componentDidMount(){
    this.renderMap();
  }
  renderMap=()=>{
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCPchsd2s7wJODl00k9vuPgGZUVo-UmthE&callback=initMap")
    window.initMap= this.initMap;
  }
  initMap=()=> {
    var map = new window.google.maps.Map(document.getElementById('map'), {
     center: {lat: 37.7648, lng: -122.463},
     zoom: 12.5
   })
  }
  render() {
    return (
      <div className="app">
        <div className="list-container">
          <h2>Neighborhood Map</h2>
          <Sidebar/>
        </div>
        <div className="map-container">
          <Map/>
        </div>
      </div>
    )
  }
}
/*The script tag with map API fetch is written as a function*/
function loadScript(url){
  /*First script tag of all the script tag is selected*/
  var refScript = window.document.getElementsByTagName("script")[0]
  /*Creating <script></script> tag*/
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  /*To keep the script at the very beginning than the other scripts*/
  refScript.parentNode.insertBefore(script, refScript)
}

export default App;
