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
  };
  to: {
    latitude: number;
    longitude: number;
  };
}

const MapComponent: FunctionComponent<MapComponentProps> = ({
  center,
  zoom,
  from,
  to,
}) => {
  var map: any;
  // var google: any;
  var mapOptions = {
    center: center,
    zoom: zoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  function initialize(): void {
    const portalDiv = document.getElementById("map")!;
    map = new google.maps.Map(portalDiv, mapOptions);

    var userCoor: any = [
      ["a", from.latitude, from.longitude],
      ["b", to.latitude, to.longitude],
    ];

    var userCoorPath = [
      new google.maps.LatLng(from.latitude, from.longitude),
      new google.maps.LatLng(to.latitude, to.longitude),
    ];

    var userCoordinate = new google.maps.Polyline({
      path: userCoorPath,
      strokeColor: "#FF0000",
      strokeOpacity: 1,
      strokeWeight: 2,
    });
    userCoordinate.setMap(map);

    map.setCenter(userCoordinate);

    for (var i = 0; i < userCoor.length; i++) {
      new google.maps.Marker({
        position: new google.maps.LatLng(userCoor[i][1], userCoor[i][2]),
        map: map,
      });
    }
  }

  useEffect(() => {
    initialize();
  });

  return <div id="map" className="w-100 h-100" />;
};

export default MapComponent;
