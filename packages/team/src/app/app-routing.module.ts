import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './shared/components/home/home.component';

const appRoutes: Routes = [
  {
    path: 'information',
    loadChildren: './modules/information/information.module#InformationModule'
  },
  { path: 'address', loadChildren: './modules/menu/menu.module#MenuModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
