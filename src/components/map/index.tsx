import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { FunctionComponent } from "react";
import MapComponent from "./MapComponent";

interface MapProps {
  from: {
    latitude: number;
    longitude: number;
  };
  to: {
    latitude: number;
    longitude: number;
  };
}

const render = (status: string) => {
  const isInActive = status === Status.LOADING || status === Status.FAILURE;
  if (isInActive) {
    return <h3>{status} ...</h3>;
  }
  return <></>;
};

const Map: FunctionComponent<MapProps> = ({ from, to }) => {
  const center = { lat: from.latitude, lng: from.longitude },
    zoom = 4;

  return (
    <Wrapper apiKey={process.env.REACT_APP_END_POINT_URL || ""} render={render}>
      <MapComponent center={center} zoom={zoom} from={from} to={to} />
    </Wrapper>
  );
};

export default Map;
