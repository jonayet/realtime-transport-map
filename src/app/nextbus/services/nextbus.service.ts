import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Vehicle, VehicleLocation, VehicleLocationsRaw } from '../models';
import { transformVehicleLocation } from '../transformers';

import 'rxjs/add/operator/map';

@Injectable()
export class NextbusService {
  private agency = 'sf-muni';
  private baseUrl = 'http://webservices.nextbus.com/service/publicJSONFeed';
  private epoc = 0;

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<Vehicle[]> {
    const vehiclesUrl = `${this.baseUrl}?command=routeList&a=${this.agency}`;
    return this.http.get<any>(vehiclesUrl).map(result => result.route.map((vehicle: Vehicle) => vehicle));
  }

  getVehicleLocation(vehicle: Vehicle): Observable<VehicleLocation> {
    const routesUrl = `${this.baseUrl}?command=vehicleLocations&a=${this.agency}&r=${vehicle.tag}&t=${this.epoc}`;
    return this.http.get<VehicleLocationsRaw>(routesUrl).map(result => {
      this.epoc = result.lastTime.time;
      return transformVehicleLocation(vehicle, result);
    });
  }
}
