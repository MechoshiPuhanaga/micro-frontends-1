import { enableProdMode, NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { platformBrowser } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import 'zone.js';
import 'reflect-metadata';

import routingProxy from './routingProxy';

import { AppModule } from './app/app.module';

let isPlatformSetup = false;

const mount = (
  el: null,
  {
    defaultHistory,
    initialPath,
    onNavigate,
    state
  }: {
    defaultHistory: object;
    initialPath: string;
    onNavigate: <T>(value: T) => {};
    state: object;
  }
) => {
  if (onNavigate) {
    routingProxy.navigate = onNavigate;
  }

  if (process.env.NODE_ENV === 'development') {
    platformBrowserDynamic().bootstrapModule(AppModule);
  } else {
    !isPlatformSetup && enableProdMode();

    platformBrowser().bootstrapModule(AppModule);
    isPlatformSetup = true;
  }

  routingProxy.parentNavigateToUrl = initialPath;

  return {
    onParentNavigate: ({ pathname }: { pathname: string }) => {
      console.log(
        'BOOTSTRAP onParentNavigate called, parentNavigateToUrl set',
        pathname
      );
      routingProxy.parentNavigateToUrl = pathname;
    }
  };
};

if (process.env.NODE_ENV === 'development') {
  mount(null, {
    defaultHistory: {},
    initialPath: '',
    onNavigate: null,
    state: {}
  });
}

export { mount };
