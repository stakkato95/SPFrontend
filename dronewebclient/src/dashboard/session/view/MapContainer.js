import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

export default function MapContainer() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={'pk.eyJ1Ijoic3Rha2thdG85NSIsImEiOiJjanpoMGVvaTkwaGJsM21vNDNhYmF1YnM3In0.xnVt5uPDlCSZXL7HmhfHWg'}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    />
  );
}