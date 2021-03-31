import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InformationComponent } from './components/information/information.component';

const appRoutes: Routes = [{ path: '', component: InformationComponent }];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class InformationRoutingModule {}
