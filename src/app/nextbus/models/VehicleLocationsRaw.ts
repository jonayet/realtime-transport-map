import { VehicleRaw } from './VehicleRaw';

export interface VehicleLocationsRaw {
  vehicle: VehicleRaw [];
  lastTime: {
    time: string
  };
}
