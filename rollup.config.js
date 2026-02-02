import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

const dev = process.env.DEV === 'true';

export default {
  input: 'src/rssfeed-metro-tile.ts',
  output: {
    file: 'dist/rssfeed-metro-tile.js',
    format: 'iife',
    name: 'RssfeedMetroTile',
    sourcemap: dev
  },
  plugins: [
    resolve({
      browser: true
    }),
    commonjs(),
    typescript({
      declaration: false,
      sourceMap: dev
    }),
    json(),
    !dev && terser({
      format: {
        comments: false
      },
      compress: {
        drop_console: true
      }
    })
  ],
  onwarn(warning, warn) {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning);
  }
};
