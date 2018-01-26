import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { select, zoom, event, geoMercator, geoPath } from 'd3';

@Component({
  selector: 'app-transport-map',
  templateUrl: './transport-map.component.html',
  styleUrls: ['./transport-map.component.scss']
})

export class TransportMapComponent implements OnInit {
  @ViewChild('host') private hostElement: ElementRef;
  @ViewChild('mapContainer') private mapContainerElement: ElementRef;

  constructor(private http: HttpClient) { }

  private createMapView(hostElement, mapContainerElement) {
    const host = select(hostElement);
    const container = select(mapContainerElement);
    const zoomHandler = zoom().on('zoom', () => {
      const transform = event.transform;
      container.attr('transform', `translate(${transform.x}, ${transform.y}) scale(${transform.k})`);
    });
    host.call(zoomHandler);
    const mapView = {
      svg: container,
      width: hostElement.offsetWidth,
      height: hostElement.offsetHeight
    };
    return mapView;
  }

  ngOnInit() {
    const mapView = this.createMapView(this.hostElement.nativeElement, this.mapContainerElement.nativeElement);
    this.http.get('assets/sfmaps/streets.json').subscribe(({ features }: any) => {
      this.createMap(mapView, features);
    });
  }

  createMap({ svg, width, height }, geoFeatures) {
    const pathColor = '#aaa';
    const projection = geoMercator()
      .scale(300000)
      .center([-122.43, 37.77]) // Center the Map
      .translate([width / 2, height / 2]);

    const path = geoPath()
      .projection(projection);

    const mapLayer = svg.append('g')
      .style('stroke', pathColor);

    mapLayer.selectAll('path')
      .data(geoFeatures)
      .enter().append('path')
      .attr('d', path)
      .attr('vector-effect', 'non-scaling-stroke');
  }
}
