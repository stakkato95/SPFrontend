import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import ReactMapGL from 'react-map-gl';
import Pin from './Pin';

export default function MapContainer() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 400,
    latitude: 48.3824647,
    longitude: 14.4801307,
    zoom: 8
  });

  const markers = useSelector(state => state.telemetry.markers);

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={'pk.eyJ1Ijoic3Rha2thdG85NSIsImEiOiJjanpoMGVvaTkwaGJsM21vNDNhYmF1YnM3In0.xnVt5uPDlCSZXL7HmhfHWg'}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {markers.map((marker, i) => {
        return (<Pin data={{ index: i, lat: marker.lat, lon: marker.lon }} />);
      })}
    </ReactMapGL>
  );
}