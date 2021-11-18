import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import { terser } from 'rollup-plugin-terser';
import svgr from '@svgr/rollup';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
import replace from '@rollup/plugin-replace';

const dev = process.env.NODE_ENV === 'development';
const prod = process.env.NODE_ENV === 'production';

export default {
  input: './src/index.ts',
  output: [
    {
      format: 'esm',
      file: './lib/index.esm.min.js',
      sourcemap: dev ? 'iniline' : prod && true,
    },
    {
      name: 'myLibrary',
      format: 'umd',
      file: './lib/index.umd.min.js',
      sourcemap: dev ? 'iniline' : prod && true,
      exports: 'named',
    },
  ],
  plugins: [
    del({
      targets: './lib/*',
      runOnce: true,
    }),
    css({
      output: 'index.css',
    }),
    svgr(),
    typescript({ tsconfig: './tsconfig.json' }),
    nodeResolve({
      browser: true,
    }),
    commonjs({
      include: /node_modules/,
    }),
    babel({
      exclude: /node_modules/,
      babelHelpers: 'runtime',
    }),
    prod && terser({ compress: true, output: { comments: false }, mangle: false }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(prod ? 'production' : dev && 'development'),
    }),
  ].filter(Boolean),
};
