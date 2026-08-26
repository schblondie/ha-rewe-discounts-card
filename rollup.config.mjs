import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import { string } from 'rollup-plugin-string';

export default {
  input: 'src/card.js',
  output: {
    file: 'card.js',
    format: 'es',
  },
  plugins: [
    resolve(),
    json(),
    string({
      include: '**/*.css',
    }),
  ],
};