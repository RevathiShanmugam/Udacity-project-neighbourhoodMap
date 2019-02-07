import React, { Component } from 'react';
import Header from './Header';
import SearchBar from './Searchbar';
import Sidebar from './Sidebar';
import './App.css';
import axios from 'axios';
import escapeRegExp from 'escape-string-regexp';

class App extends Component {
  constructor(props) {
    super(props)
      this.state={
        /*We can view the state date @dev tools=>React=>state*/
        venues: [],
        markers: [],
        showVenues: [],
        query: '',
        notVisibleMarkers: []
      }
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
      /*Moving the render map Callback function here
      (After venues array gets its data from foursquare API)*/
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

   var infowindow = new window.google.maps.InfoWindow({
    maxWidth: 180
    })
  
    this.infowindow= infowindow

   /*looping through venues array*/
   this.state.venues.map(myVenue=>{
    var contentString = `<b>${myVenue.venue.name}</b>
    <br> ${myVenue.venue.location.formattedAddress}<br>`
  
    var marker = new window.google.maps.Marker({
      position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
      map: map,
      animation: window.google.maps.Animation.DROP,
      title: myVenue.venue.name
    })
    marker.addListener('click', function() {
      /*Update content using setContent*/
      infowindow.setContent(contentString);
      infowindow.open(map, marker);
  })
  })
  }
  /* Update query based on the user input in search box.*/
  updateQuery = query => {
    this.setState({ query })
    this.state.markers.map(marker => marker.setVisible(true))
    let filterVenues
    let notVisibleMarkers

    if (query) {
      const match = new RegExp(escapeRegExp(query), "i")
      filterVenues = this.state.venues.filter(myVenue =>
        match.test(myVenue.venue.name))
      this.setState({ venues: filterVenues })
      notVisibleMarkers = this.state.markers.filter(marker =>
        filterVenues.every(myVenue => myVenue.venue.name !== marker.title)
    )
    /*Hiding the markers for venues not having the letters typed in search box. */
    notVisibleMarkers.forEach(marker => marker.setVisible(false))
    this.setState({ notVisibleMarkers })
    } else{
    this.setState({ venues: this.state.showVenues })
    this.state.markers.forEach(marker => marker.setVisible(true))
  }
}

  render() {
    return (
      <main>
        <div id="header">
        <Header/>
        </div>
        <div id="SearchBar" aria-label="Search Bar">
          <SearchBar
            venues={ this.state.showVenues }
            markers={ this.state.markers }
            filteredVenues={ this.filteredVenues }
  	      	query={this.state.query}
            clearQuery={this.state.showVenues}
	        	updateQuery={b => this.updateQuery(b)}
	        	clickLocation={this.clickLocation}
          />
        </div>
        <div id="container" aria-label="Menu Container">
          <Sidebar venues={ this.state.venues } markers={ this.state.markers}/>
        </div>
        <div id="map"></div>
      </main>
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