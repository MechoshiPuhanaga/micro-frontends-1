import path from 'path';

const aliases: { [key: string]: object } = {
  web: {
    '@root': path.resolve(__dirname, '/'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@services': path.resolve(__dirname, 'src/services'),
    '@styles': path.resolve(__dirname, 'src/styles')
  }
};

export default () => {
  return Object.keys(aliases).reduce((accum: { [key: string]: string }, parentName) => {
    Object.keys(aliases[parentName]).forEach((aliasName) => {
      if (typeof accum[aliasName] === 'undefined') {
        accum[aliasName] = (aliases as any)[parentName][aliasName];
      }
    });

    return accum;
  }, {});
};
