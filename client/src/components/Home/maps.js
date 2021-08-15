import React, { Component } from 'react'
import './styles.css';
import Geocode from 'react-geocode';
import {
  InfoWindow,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
Geocode.setApiKey("AIzaSyCAIcQc27TZC5bpIoBt_2AnU5lHGIiZQ2s");
Geocode.enableDebug();
class Maps extends Component {

  render() {
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 18.960340, lng: 73.803062 }}
      >
        <Marker
          draggable={true}
          onDragEnd={this.MarkerDragged}
          position={{ lat: 18.960340, lng: 73.803062 }}
        >
          <InfoWindow>
            <div>Kadadhe,Pune,Maharashtra</div>
          </InfoWindow>
        </Marker>
      </GoogleMap>));
    return (
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCAIcQc27TZC5bpIoBt_2AnU5lHGIiZQ2s&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px`,marginLeft:`20px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
export default Maps;