import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subscriber } from 'rxjs/Subscriber';
import { Subject } from 'rxjs/Subject';
import { Store, select } from '@ngrx/store';

import { Route, Vehicles } from '../../nextbus/models';
import { State, StreetsStore, RoutesStore, VehiclesStore } from '../../store';
import { UpdateStreets } from '../../store/streets';
import { UpdateRoutes } from '../../store/routes';
import { UpdateVehicles } from '../../store/vehicles';
import { ControlledStream } from './ControlledStream';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/timer';
import { ExtendedFeature, GeoGeometryObjects } from 'd3';

@Injectable()
export class MapDataService {
  streets: Observable<ExtendedFeature<GeoGeometryObjects, any>[]>;
  routes: Observable<Route[]>;
  vehicles: Observable<Vehicles>;

  constructor(private store: Store<State>) {
    this.streets = store.pipe(select(StreetsStore));
    this.routes = store.pipe(select(RoutesStore));
    this.vehicles = store.pipe(select(VehiclesStore));

    this.routes.subscribe((routes) => {
      if (!routes || !routes.length) {
        return;
      }
      const subscription = this.updateMap(routes).subscribe();

      // setInterval(() => {
      //   subscription.unsubscribe();
      // }, 5000);
    });
  }

  private updateMap(routes: Route[], reqPerBatch = 20, interval = 10000): Observable<void> {
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
      updateMapSubscription = this.updateMapOnce(routes, reqPerBatch, interval).subscribe(() => {
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

  private updateMapOnce(routes: Route[], reqPerBatch = 10, interval = 2000): Observable<void> {
    const stream = new ControlledStream<Route>(routes);
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
      this.store.dispatch(new UpdateVehicles(vehicle));
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

  updateRoutes() {
    this.store.dispatch(new UpdateRoutes());
  }
}
