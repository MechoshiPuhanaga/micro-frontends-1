import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationRoutingModule } from './information-routing.module';
import { InformationComponent } from './components/information/information.component';

@NgModule({
  declarations: [InformationComponent],
  imports: [CommonModule, InformationRoutingModule],
  providers: []
})
export class InformationModule {}
