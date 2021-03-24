import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';

const mount = (el, { defaultMode, initialPath, onNavigate }) => {
  const router = createRouter(defaultMode || 'abstract');

  if (initialPath) {
    router.push({ path: initialPath });
  }

  new Vue({
    router,
    render: (h) => h(App)
  }).$mount(el);

  if (typeof onNavigate === 'function') {
    router.afterEach((to, from) => {
      onNavigate({ pathname: to.path });
    });
  }

  return {
    onParentNavigate: ({ pathname: newPathname }) => {
      if (router.history.current.path !== newPathname) {
        router.push({ path: newPathname });
      }
    }
  };
};

if (__mode__ === 'development') {
  const devRoot = document.getElementById('micro-frontend-dashboard');

  if (devRoot) {
    mount(devRoot, {
      defaultMode: 'history'
    });
  }
}

export { mount };
