import { Vehicle } from './Vehicle';

export interface Vehicles {
  [uniqueVehicleId: string]: Vehicle;
}
