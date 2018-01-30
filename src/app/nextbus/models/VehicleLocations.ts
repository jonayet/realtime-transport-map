import { VehicleRaw } from './VehicleRaw';

export interface VehicleLocations {
  vehicle: VehicleRaw [];
  lastTime: {
    time: string
  };
}
