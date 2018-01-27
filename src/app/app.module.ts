import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { TransportMapComponent } from './transport-map/transport-map.component';
import { MapViewService } from './transport-map/map-view.service';

@NgModule({
  declarations: [
    AppComponent,
    TransportMapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [MapViewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
