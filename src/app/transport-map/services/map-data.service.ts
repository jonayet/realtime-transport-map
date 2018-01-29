import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store, select } from '@ngrx/store';

import { Vehicle, VehicleLocations } from '../../nextbus/models';
import { State, StreetsStore, VehiclesStore, VehicleLocationsStore } from '../../store';
import { UpdateStreets } from '../../store/streets';
import { UpdateVehicles } from '../../store/vehicles';
import { UpdateVehicleLocations } from '../../store/vehicle-locations';
import { ControlledStream } from './ControlledStream';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/multicast';
import { Subscriber } from 'rxjs/Subscriber';
import { Subject } from 'rxjs/Subject';



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
      if (!vehicles || !vehicles.length) {
        return;
      }
      const subscription = this.updateMap(vehicles).subscribe();

      // setTimeout(() => {
      //   subscription.unsubscribe();
      // }, 5000);
    });
  }

  private updateMap(vehicles: Vehicle[], reqPerBatch = 10, interval = 5000): Observable<void> {
    let internalObserver: Subscriber<void>;
    let externalObserver: Subscriber<void>;
    let updateMapSubscription: Subscription;

    const internalSubscription = new Observable<void>(observer => {
      internalObserver = observer;
      observer.next();
      return () => {
        updateMapSubscription.unsubscribe();
        observer.unsubscribe();
      };
    }).subscribe(() => {
      updateMapSubscription = this.updateMapOnce(vehicles, reqPerBatch, interval).subscribe(() => {
        internalObserver.next();
        externalObserver.next();
      });
    });

    const observable = new Observable<void>(observer => {
      externalObserver = observer;
      return () => {
        internalSubscription.unsubscribe();
        observer.unsubscribe();
      };
    });
    return observable;
  }

  private updateMapOnce(vehicles: Vehicle[], reqPerBatch = 10, interval = 2000): Observable<void> {
    const stream = new ControlledStream<Vehicle>(vehicles);
    let timerSubscription: Subscription;
    let streamSubscription: Subscription;
    let observer: Subscriber<void>;

    const observable = new Observable<void>(_observer => {
      observer = _observer;
      return () => {
        streamSubscription.unsubscribe();
        timerSubscription.unsubscribe();
        observer.unsubscribe();
      };
    });

    // console.log('-------Start-------', new Date().toISOString());
    streamSubscription = stream.source.subscribe((vehicle) => {
      this.store.dispatch(new UpdateVehicleLocations(vehicle));
    }, (err) => {
      observer.error();
    }, () => {
      timerSubscription.unsubscribe();
      observer.next();
      observer.complete();
      // console.log('-------Finish-------', new Date().toISOString());
    });

    timerSubscription = Observable.timer(0, interval).subscribe(() => {
      stream.request(reqPerBatch);
    });

    return observable;
  }

  updateStreets() {
    this.store.dispatch(new UpdateStreets());
  }

  updateVehicles() {
    this.store.dispatch(new UpdateVehicles());
  }
}
