import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { platformBrowser } from '@angular/platform-browser';
import { Router } from '@angular/router';
import 'zone.js';
import 'reflect-metadata';

import cache from './cache';

import { AppModule } from './app/app.module';

let isPlatformSetup = false;

const mount = (
  el: null,
  {
    defaultHistory,
    initialPath,
    onNavigate
  }: {
    defaultHistory: object;
    initialPath: string;
    onNavigate: () => {};
  }
) => {
  if (process.env.NODE_ENV === 'development') {
    platformBrowserDynamic().bootstrapModule(AppModule);
  } else {
    !isPlatformSetup && enableProdMode();

    platformBrowser().bootstrapModule(AppModule);
    isPlatformSetup = true;
  }

  return {
    onParentNavigate: ({ pathname }: { pathname: string }) => {
      cache.router?.navigateByUrl('/');
    }
  };
};

if (process.env.NODE_ENV === 'development') {
  mount(null, {
    defaultHistory: {},
    initialPath: '',
    onNavigate: null
  });
}

export { mount };
