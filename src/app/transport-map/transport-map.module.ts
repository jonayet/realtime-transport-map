import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportMapComponent } from './components';
import { MapViewService, MapDataService } from './services';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ TransportMapComponent ],
  exports:  [ TransportMapComponent ],
  providers: [ MapViewService, MapDataService ]
})
export class TransportMapModule { }
