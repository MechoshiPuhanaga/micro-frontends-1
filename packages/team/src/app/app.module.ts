import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './shared/components/home/home.component';

import '../styles/index.scss';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/team' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
