import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, zoom, event, geoMercator, geoPath } from 'd3';

import { Route } from '../../nextbus/models';
import { MapLayer, LayerOptions } from '../models';
import { MapViewService, MapDataService } from '../services';

@Component({
  selector: 'app-transport-map',
  templateUrl: './transport-map.component.html',
  styleUrls: ['./transport-map.component.scss']
})

export class TransportMapComponent implements OnInit, OnDestroy {
  @ViewChild('mapHost') hostElement: ElementRef;

  routesControl = new FormControl();
  routes: Route[];
  isInitialized = false;

  private projectionOption = {
    scale: 1000000,
    centroid: [-122.45, 37.76]
  };

  private rootLayerOptions = {
    fill: '#eee'
  };

  private routeLayerOptions = {
    stroke: '#aaa'
  };

  private transportLayerOptions = {
    fill: 'red'
  };

  private routeLayer: MapLayer;
  private transportLayer: MapLayer;

  constructor(
    private mapViewService: MapViewService,
    private mapDataService: MapDataService
  ) {}

  ngOnInit() {
    const mapRootLayer = this.mapViewService.createMap(this.hostElement.nativeElement, this.rootLayerOptions, this.projectionOption);
    this.routeLayer = this.mapViewService.createLayer(mapRootLayer, this.routeLayerOptions);
    this.transportLayer = this.mapViewService.createLayer(mapRootLayer, this.transportLayerOptions);

    this.mapDataService.streetsGeoData.subscribe((streetsGeoData) => {
      this.mapViewService.drawRouteLayer(this.routeLayer, streetsGeoData);
    });

    this.mapDataService.routes.subscribe((routes) => {
      this.routes = routes;
      if (!this.isInitialized && routes.length) {
        this.mapDataService.updateRouteDetailsOnceInBackground(routes);
        this.mapDataService.updateVehiclesInBackground(routes);
        this.isInitialized = true;
      }
    });

    this.mapDataService.vehiclesGeoData.subscribe((vehicleGeoData) => {
      this.mapViewService.drawTransportLayer(this.transportLayer, vehicleGeoData);
    });

    this.mapDataService.updateStreets();
    this.mapDataService.updateRoutes();
  }

  ngOnDestroy() {
    this.mapDataService.stopUpdatingRouteDetails();
    this.mapDataService.stopUpdatingVehicles();
  }

  onFilterChange(selection) {
    this.mapDataService.updateVehiclesInBackground(selection.value);
  }
}
