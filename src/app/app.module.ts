import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { NextbusModule } from './nextbus';
import { TransportMapModule } from './transport-map';
import { reducers, effects } from './store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    NextbusModule,
    TransportMapModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
