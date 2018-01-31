import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import { GeoData, GeoFeature } from '../models';
import { Route, Routes, Vehicles } from '../../nextbus/models';
import { State, StreetsStore, RoutesStore, VehiclesStore } from '../../store';
import { UpdateStreets } from '../../store/streets';
import { UpdateRoutes, UpdateRouteDetails } from '../../store/routes';
import { UpdateVehicles, RemoveAllVehicles } from '../../store/vehicles';
import { convertToArray, convertToGeoData, doLazyStream } from '../utilities';


@Injectable()
export class MapDataService {
  streetsGeoData: Observable<GeoData>;
  routes: Observable<Route[]>;
  routeCache: Route[];
  vehiclesGeoData: Observable<GeoData>;
  private isRouteDetailsUpdated = false;
  private isRouteDetailsUpdateing = false;

  constructor(private store: Store<State>) {
    this.routeCache = [];
    this.streetsGeoData = store.pipe(select(StreetsStore));
    this.routes = store.pipe(select(RoutesStore)).map((routes) => convertToArray(routes, (r) => r));
    this.vehiclesGeoData = store.pipe(select(VehiclesStore)).map((vehicles) => {
      return convertToGeoData(vehicles);
    });

    this.routes.subscribe((routes) => {
      console.log(routes);
      this.routeCache = [].concat(routes);
      if (!routes || !routes.length) {
        return;
      }

      if (!this.isRouteDetailsUpdated && !this.isRouteDetailsUpdateing) {
        this.updateRouteDetailsInBackground();
      }
      // this.updateRouteDetails(routes);

      // const subscription = this.updateMap(routes).subscribe();

      // setInterval(() => {
      //   this.store.dispatch(new UpdateVehicles(routes[0]));
      //   // subscription.unsubscribe();
      // }, 5000);
    });
  }

  updateRouteDetailsInBackground() {
    this.isRouteDetailsUpdateing = true;
    this.isRouteDetailsUpdated = false;
    doLazyStream<Route>(this.routeCache, 5, 10000).subscribe((route) => {
      if (!route.isUpdated) {
        this.store.dispatch(new UpdateRouteDetails(route));
      }
    }, (error) => {
      console.log(error);
      this.isRouteDetailsUpdateing = false;
    }, () => {
      this.isRouteDetailsUpdateing = false;
      this.isRouteDetailsUpdated = true;
    });
  }

  // updateMap(routes: Route[], reqPerBatch = 10, interval = 10000): Observable<void> {
  //   let internalObserver: Subscriber<void>;
  //   let externalObserver: Subscriber<void>;
  //   let updateMapSubscription: Subscription;
  //   let timerSubscription: Subscription;

  //   const internalSubscription = new Observable<void>(observer => {
  //     internalObserver = observer;
  //     internalObserver.next();
  //     return () => {
  //       updateMapSubscription.unsubscribe();
  //       timerSubscription.unsubscribe();
  //       internalObserver.unsubscribe();
  //     };
  //   }).subscribe(() => {
  //     updateMapSubscription = this.updateVehiclesOnceLazily(routes, reqPerBatch, interval).subscribe(() => {
  //       externalObserver.next();
  //       timerSubscription = Observable.timer(interval).subscribe(() => {
  //         internalObserver.next();
  //       });
  //     });
  //   });

  //   const externalObservable = new Observable<void>(observer => {
  //     externalObserver = observer;
  //     return () => {
  //       internalSubscription.unsubscribe();
  //       externalObserver.unsubscribe();
  //     };
  //   });
  //   return externalObservable;
  // }

  updateVehicles(route: Route) {
    this.store.dispatch(new UpdateVehicles(route));
  }

  updateStreets() {
    this.store.dispatch(new UpdateStreets());
  }

  updateRoutes() {
    this.store.dispatch(new UpdateRoutes());
  }

  removeAllVehicles() {
    this.store.dispatch(new RemoveAllVehicles());
  }
}
