import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TransportMapComponent } from './components';
import { MapViewService, MapDataService } from './services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  declarations: [ TransportMapComponent ],
  exports:  [ TransportMapComponent ],
  providers: [ MapViewService, MapDataService ]
})
export class TransportMapModule { }
