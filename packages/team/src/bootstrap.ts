import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { platformBrowser } from '@angular/platform-browser';
import { Router } from '@angular/router';
import 'zone.js';
import 'reflect-metadata';

import observable from './observable';

import { AppModule } from './app/app.module';

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
  let router: Router;

  observable.routerObservable?.subscribe((val: { _router: Router }) => {
    router = val?._router;
  });

  if (process.env.NODE_ENV === 'development') {
    platformBrowserDynamic().bootstrapModule(AppModule);
  } else {
    enableProdMode();

    platformBrowser().bootstrapModule(AppModule);
  }

  return {
    onParentNavigate: ({ pathname }: { pathname: string }) => {
      console.log('pathname: ', pathname);
      router.navigateByUrl('pathname');
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
