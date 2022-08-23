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
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <></>;
};

const Map: FunctionComponent<MapProps> = ({ from, to }) => {
  const center = { lat: from.latitude, lng: from.longitude };
  const zoom = 3;

  return (
    <Wrapper apiKey="AIzaSyAIoONB5C_eYpN-WedVbXaMK4lFbOTHtDI" render={render}>
      <MapComponent center={center} zoom={zoom} from={from} to={to} />
    </Wrapper>
  );
};

export default Map;
