import path from 'path';

const resources = ['_mixins.scss', '_variables.scss'];

export default resources.map((file) => path.resolve(__dirname, file));
