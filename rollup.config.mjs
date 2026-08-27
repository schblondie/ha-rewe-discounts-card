import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import { string } from 'rollup-plugin-string';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/card.js',
  output: {
    file: 'card.js',
    format: 'es',
    compact: true,
  },
  plugins: [
    resolve(),
    json(),
    string({
      include: '**/*.css',
    }),
    terser({
      format: {
        comments: false // strip all comments
      }
    })
  ],
};