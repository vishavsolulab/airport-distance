import { FunctionComponent, useState } from "react";
import { Maps, SearchInput } from "./components";
import { Button } from "@mui/material";
import data from "./_mocks/us_airpots.json";

import { calculateDistance } from "./api/distance";

const App: FunctionComponent = () => {
  const [fromValue, setFromValue] = useState<string | null>(null),
    [toValue, setToValue] = useState<string | null>(null),
    [milesDistance, setMilesDistance] = useState<number | null>(null),
    [location, setLocation] = useState<any>(null);

  const handleFromValueChange = (_: any, newValue: string) => {
    setFromValue(newValue);
  };

  const handleToValueChange = (_: any, newValue: string) => {
    setToValue(newValue);
  };

  const handleSubmit = () => {
    const fromLocation = data.filter(
      (item: { iata: string }) => item.iata === fromValue?.split(", ")[1]
    );
    const toLocation: any = data.filter(
      (item: { iata: string }) => item.iata === toValue?.split(", ")[1]
    );

    setLocation([
      {
        latitude: parseFloat(fromLocation[0].lat),
        longitude: parseFloat(fromLocation[0].lng),
        fromLocation,
      },
      {
        latitude: parseFloat(toLocation[0].lat),
        longitude: parseFloat(toLocation[0].lng),
        toLocation,
      },
    ]);
    setMilesDistance(
      calculateDistance(
        {
          latitude: parseFloat(fromLocation[0].lat),
          longitude: parseFloat(fromLocation[0].lng),
        },
        {
          latitude: parseFloat(toLocation[0].lat),
          longitude: parseFloat(toLocation[0].lng),
        }
      )
    );
  };
  return (
    <div className="App d-flex justify-content-center">
      <div className="left-container pt-5 w-100">
        <div className="input-contianer ">
          <p className="distance_label">Search by Airport Name or IATA airport code</p>
          <div className="form_fields">
            <SearchInput
              placeholder="From Airport"
              data={data}
              onChange={handleFromValueChange}
            />
            <SearchInput
              placeholder="To Airport"
              className="mt-4"
              data={data}
              onChange={handleToValueChange}
            />
            <div className="submit-btn mt-4">
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!(fromValue && toValue)}
              >
                Calculate Distance
              </Button>
          </div>
          </div>
        </div>

        {(milesDistance || milesDistance === 0) && (
          <div className="distance-text mt-5 w-75">
            <div className="fw-bold fs-4">
              {milesDistance.toFixed(2)} miles</div>
            is the Distance From <span>{fromValue}</span> To <span>{toValue}</span>
          </div>
        )}
      </div>
      {location && (
        <div className="maps-container d-flex justify-content-center flex-column align-items-center">
          <Maps from={location[0]} to={location[1]} />
        </div>
      )}
    </div>
  );
};

export default App;
