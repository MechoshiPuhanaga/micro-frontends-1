const routingObj: {
  navigate: (<T>(value: T) => void) | null;
  parentNavigate: (<T>(value: T) => void) | null;
  navigateToUrl: string;
  parentNavigateToUrl: string;
} = {
  navigate: null,
  parentNavigate: null,
  navigateToUrl: '',
  parentNavigateToUrl: ''
};

const routingProxy = new Proxy(routingObj, {
  set(target, prop, value, receiver) {
    if (
      (prop === 'navigate' || prop === 'parentNavigate') &&
      typeof value === 'function'
    ) {
      target[prop] = value.bind(target);

      return true;
    } else if (prop === 'navigateToUrl') {
      target[prop] = value;
      target.navigate?.(value);

      return true;
    } else if (prop === 'parentNavigateToUrl') {
      target[prop] = value;
      target.parentNavigate?.(value);

      return true;
    } else {
      return false;
    }
  }
});

export default routingProxy;
