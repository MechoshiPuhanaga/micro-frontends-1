import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { platformBrowser } from '@angular/platform-browser';
import 'zone.js';

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
  if (process.env.NODE_ENV === 'development') {
    platformBrowserDynamic().bootstrapModule(AppModule);
  } else {
    enableProdMode();

    platformBrowser().bootstrapModule(AppModule);
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
