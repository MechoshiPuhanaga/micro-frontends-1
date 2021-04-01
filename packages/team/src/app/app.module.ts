import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';

import observable from '../observable';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './shared/components/home/home.component';

import '../styles/index.scss';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/team' }],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(private _router: Router) {
    _router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        console.log(val);
      }
    });

    observable.routerObservable = new Observable<object>(
      (observer: Observer<object>) => {
        observer.next({ _router });
      }
    );
  }

  public ngDoBootstrap(appRef: ApplicationRef): void {
    if (document.querySelector('app-root')) {
      appRef.bootstrap(AppComponent);
    }
  }
}
