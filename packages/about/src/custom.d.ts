declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'auth/AuthApp' {
  import { mount } from 'auth/AuthApp';

  export { mount };
}
