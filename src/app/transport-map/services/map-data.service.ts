import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';

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
  private routeStreamSubscription: Subscription;
  private vehicleStreamSubscription: Subscription;
  private vehicleStreamTimerSubscription: Subscription;

  constructor(private store: Store<State>) {
    this.routeCache = [];
    this.streetsGeoData = store.pipe(select(StreetsStore));
    this.routes = store.pipe(select(RoutesStore)).map((routes) => convertToArray(routes, (r) => r));
    this.vehiclesGeoData = store.pipe(select(VehiclesStore)).map((vehicles) => {
      return convertToGeoData(vehicles);
    });
  }

  updateRouteDetailsOnceInBackground(routes: Route[]) {
    this.stopUpdatingRouteDetails();
    this.routeStreamSubscription = doLazyStream<Route>(routes, 5, 15000).subscribe((route) => {
      this.store.dispatch(new UpdateRouteDetails(route));
    }, (error) => {
      console.log(error);
    });
  }

  updateVehiclesInBackground(routes: Route[]) {
    this.stopUpdatingVehicles();
    this.vehicleStreamSubscription = doLazyStream<Route>(routes, 5, 15000).subscribe((route) => {
      this.store.dispatch(new UpdateVehicles(route));
    }, (error) => {
      console.log(error);
    }, () => {
      this.vehicleStreamTimerSubscription = Observable.timer(15000).subscribe(() => {
        this.updateVehiclesInBackground(routes);
      });
    });
  }

  stopUpdatingRouteDetails() {
    if (this.routeStreamSubscription) {
      this.routeStreamSubscription.unsubscribe();
    }
  }

  stopUpdatingVehicles() {
    if (this.vehicleStreamSubscription) {
      this.vehicleStreamSubscription.unsubscribe();
    }
    if (this.vehicleStreamTimerSubscription) {
      this.vehicleStreamTimerSubscription.unsubscribe();
    }
  }

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
