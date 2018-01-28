import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { select, zoom, event, geoMercator, geoPath } from 'd3';

import { MapLayer, LayerOptions } from '../models';
import { MapViewService, MapDataService } from '../services';

@Component({
  selector: 'app-transport-map',
  templateUrl: './transport-map.component.html',
  styleUrls: ['./transport-map.component.scss']
})

export class TransportMapComponent implements OnInit {
  @ViewChild('mapHost') private hostElement: ElementRef;

  private projectionOption = {
    scale: 300000,
    centroid: [-122.45, 37.76]
  };

  private rootLayerOptions = {
    fill: '#eee'
  };

  private routeLayerOptions = {
    stroke: '#aaa'
  };

  private transportLayerOptions = {
    fill: 'red',
    stroke: 'red'
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

    this.mapDataService.streets.subscribe((data) => {
      this.mapViewService.drawRouteLayer(this.routeLayer, data);
    });

    this.mapDataService.routes.subscribe((data) => {
      this.mapViewService.drawTransportLayer(this.transportLayer, [[-122.495898, 37.748055]]);
    });

    this.mapDataService.updateRoutes();
    this.mapDataService.updateStreets();
  }
}
