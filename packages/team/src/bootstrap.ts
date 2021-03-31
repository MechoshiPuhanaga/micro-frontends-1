import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
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
  platformBrowserDynamic().bootstrapModule(AppModule);

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
