import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { platformBrowser } from '@angular/platform-browser';
import 'zone.js';

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
    onParentNavigate: ({ pathname: newPathname }: { pathname: string }) => {}
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
