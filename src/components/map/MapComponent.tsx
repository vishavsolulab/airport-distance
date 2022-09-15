import { FunctionComponent, useEffect } from "react";

interface MapComponentProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  from: {
    latitude: number;
    longitude: number;
    fromLocation?: any;
  };
  to: {
    latitude: number;
    longitude: number;
    toLocation?: any;
  };
}

const MapComponent: FunctionComponent<MapComponentProps> = ({
  center,
  zoom,
  from,
  to,
}) => {
  let map: any;
  let mapOptions = {
    center: center,
    zoom: zoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    showLocateMeButton: false,
    showZoomButtons: true,
    showMapTypeSelector: true,
    disablePanning: false,
    disableScrollWheelZoom: false,
    minZoom: 2,
    title: "markerTitle",
    label: "Hello",
  };

  function initialize(): void {
    const portalDiv = document.getElementById("map")!;
    map = new google.maps.Map(portalDiv, mapOptions);

    let userCoor: any = [
      [from.fromLocation, from.latitude, from.longitude],
      [to.toLocation, to.latitude, to.longitude],
    ];

    let userCoorPath = [
      new google.maps.LatLng(from.latitude, from.longitude),
      new google.maps.LatLng(to.latitude, to.longitude),
    ];

    let userCoordinate = new google.maps.Polyline({
      path: userCoorPath,
      geodesic: true,
      strokeColor: "#41aff8",
      strokeOpacity: 1,
      strokeWeight: 5,
    });
    userCoordinate.setMap(map);

    map.setCenter(userCoordinate);

    for (let i = 0; i < userCoor.length; i++) {
      new google.maps.Marker({
        position: new google.maps.LatLng(userCoor[i][1], userCoor[i][2]),
        map: map,
        title: userCoor[i][0][0].name,
      });
    }
  }

  useEffect(() => {
    initialize();
  });

  return <div id="map" className="w-100 h-100" />;
};

export default MapComponent;
