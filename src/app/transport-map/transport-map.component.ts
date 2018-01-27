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
      const transports = [[-122.490402, 37.786453], [-122.389809, 37.72728], [-122.483710, 37.750148]];
      const options = {
        centroid: [-122.43, 37.77],
        pathColor: '#aaa',
        transportColor: 'red'
      };
      this.createMap(mapView, features, transports, options);
    });
  }

  createMap({ svg, width, height }, geoFeatures, transports, { centroid, pathColor, transportColor }) {
    const projection = geoMercator()
      .scale(300000)
      .center(centroid)
      .translate([width / 2, height / 2]);

    const path = geoPath()
      .projection(projection);

    const pathLayer = svg.append('g')
      .style('stroke', pathColor);

    pathLayer.selectAll('path')
      .data(geoFeatures)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('vector-effect', 'non-scaling-stroke');

    const transportLayer = svg.append('g')
      .style('stroke', transportColor);

    transportLayer.selectAll('circle')
      .data(transports)
      .enter()
      .append('circle')
      .attr('cx', (d) => projection(d)[0])
      .attr('cy', (d) => projection(d)[1])
      .attr('r', '1px')
      .attr('fill', transportColor);
  }
}
