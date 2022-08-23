import { getPreciseDistance } from "geolib";

interface CalculateDistanceProps {
  latitude: number;
  longitude: number;
}

export function calculateDistance(
  from: CalculateDistanceProps,
  to: CalculateDistanceProps
): number {
  const distance = getPreciseDistance(from, to); // in meters

  const kmDistance = distance / 1000;

  const milesDistance = kmDistance * 0.621371;

  return milesDistance;
}
