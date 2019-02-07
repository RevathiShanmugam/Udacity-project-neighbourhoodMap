import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Map from './Map';
import Header from './Header';
import './App.css';
import axios from 'axios';

class App extends Component {
  state={
    /*We can view the state date @dev tools=>React=>state*/
    venues: []
  }
  componentDidMount(){ 
    this.getVenues();
  /* The map is loaded first and the Venues are not displayed because getVenue takes more time to execute  this.renderMap();*/
  }
  renderMap=()=>{
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCPchsd2s7wJODl00k9vuPgGZUVo-UmthE&callback=initMap")
    window.initMap= this.initMap;
  }
  
  /*Getting venues from Foursquare API
  Refer: https://developer.foursquare.com/docs/api/venues/explore*/
  getVenues=()=>{
    var endPoint= "https://api.foursquare.com/v2/venues/explore?";
    var parameters={
      client_id: "YQDZ04LQO2JIOQRJ5G1CKSDQSLTITADDOZNOOXLL02KSB0O4" ,
      client_secret: "OW3QXUERVSHYN5OQKMGWLY2M3MFLJECDXOE20X1MYDAS4XT2" ,
      query: "sights" ,
      near: "San Francisco" ,
      v: "20190106"
    }
    
  /*Persorming GET request on Foursquare API using axios*/
  /*Response from API is logged in console(conole=>user message=> data)*/
    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response=>{this.setState({
      venues: response.data.response.groups[0].items},
      /*Moving the render map Callback function here*/
      this.renderMap())
    }).catch(error=>{
      console.log("Error while fetching data from Foursquare. "+ error);
    })
  }

  initMap=()=> {
    var map = new window.google.maps.Map(document.getElementById('map'), {
     center: {lat: 37.7648, lng: -122.463},
     zoom: 12.5
   })
   /*looping through venues array*/
   this.state.venues.map(myVenue=>{
    var contentString = `<b>${myVenue.venue.name}</b>
    <br> ${myVenue.venue.location.formattedAddress}`
  
    var marker = new window.google.maps.Marker({
      position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
      map: map,
      animation: window.google.maps.Animation.DROP,
      title: myVenue.venue.name
    })
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