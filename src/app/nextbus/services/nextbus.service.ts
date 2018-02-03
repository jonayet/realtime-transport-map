import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { Route, Routes, Stop, RouteList, RouteConfig, Vehicles, VehicleLocations } from '../models';
import { transformRoutes, transformVehicles, transformRouteDetails, transformStops } from '../transformers';

@Injectable()
export class NextbusService {
  private agency = 'sf-muni';
  private baseUrl = 'http://webservices.nextbus.com/service/publicJSONFeed';
  private lastRequestTimeMap = {};

  constructor(private http: HttpClient) { }

  getRoutes(): Observable<Routes> {
    const routesUrl = `${this.baseUrl}?command=routeList&a=${this.agency}`;
    return this.http.get<RouteList>(routesUrl).map(routeList => transformRoutes(routeList));
  }

  getVehicles(route: Route): Observable<Vehicles> {
    const lastRequestTime = this.lastRequestTimeMap[route.tag] || 0;
    const routesUrl = `${this.baseUrl}?command=vehicleLocations&a=${this.agency}&r=${route.tag}&t=${lastRequestTime}`;
    return this.http.get<VehicleLocations>(routesUrl).map(vehicleLocations => {
      this.lastRequestTimeMap[route.tag] = vehicleLocations.lastTime.time;
      return transformVehicles(route, vehicleLocations);
    });
  }

  updateRouteDetails(route: Route): Observable<RouteConfig> {
    const routesUrl = `${this.baseUrl}?command=routeConfig&a=${this.agency}&r=${route.tag}`;
    return this.http.get<RouteConfig>(routesUrl);
  }
}
