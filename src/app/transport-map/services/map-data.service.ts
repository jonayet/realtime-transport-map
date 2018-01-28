import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import { Vehicle, VehicleLocations } from '../../nextbus/models';
import { State, StreetsStore, VehiclesStore, VehicleLocationsStore } from '../../store';
import { UpdateStreets } from '../../store/streets';
import { UpdateVehicles } from '../../store/vehicles';
import { UpdateVehicleLocations } from '../../store/vehicle-locations';

@Injectable()
export class MapDataService {
  streets: Observable<any[]>;
  vehicles: Observable<Vehicle[]>;
  vehicleLocations: Observable<VehicleLocations>;

  constructor(private store: Store<State>) {
    this.streets = store.pipe(select(StreetsStore));
    this.vehicles = store.pipe(select(VehiclesStore));
    this.vehicleLocations = store.pipe(select(VehicleLocationsStore));

    this.vehicles.subscribe((vehicles) => {
      console.log('vehicles[0]', vehicles[0]);
      if (vehicles && vehicles.length) {
        this.store.dispatch(new UpdateVehicleLocations(vehicles[0]));
        this.store.dispatch(new UpdateVehicleLocations(vehicles[1]));
        this.store.dispatch(new UpdateVehicleLocations(vehicles[2]));
      }
    });

    this.vehicleLocations.subscribe((data) => {
      console.log('vehicleLocations', data);
    });
  }

  updateStreets() {
    this.store.dispatch(new UpdateStreets());
  }

  updateVehicles() {
    this.store.dispatch(new UpdateVehicles());
  }
}
