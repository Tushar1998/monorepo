import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import { terser } from 'rollup-plugin-terser';
import svgr from '@svgr/rollup';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
import sourcemaps from 'rollup-plugin-sourcemaps';
import peerDeps from 'rollup-plugin-peer-deps-external';
import pkg from './package.json';

export default () => {
  const dev = process.env.NODE_ENV === 'development';
  const prod = process.env.NODE_ENV === 'production';

  const globals = {
    react: 'React',
    'react-dom': 'ReactDOM',
  };

  return {
    input: './src/index.ts',
    output: [
      {
        format: 'cjs',
        file: pkg.main,
        sourcemap: dev ? 'inline' : prod && true,
        globals,
      },
      {
        format: 'esm',
        file: pkg.module,
        sourcemap: dev ? 'inline' : prod && true,
        globals,
      },
      {
        name: 'react-library',
        format: 'umd',
        file: pkg.browser,
        sourcemap: dev ? 'inline' : prod && true,
        globals,
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
      sourcemaps(),
      peerDeps(),
      nodeResolve(),
      commonjs(),
      babel({
        exclude: /node_modules/,
        babelHelpers: 'runtime',
      }),
      prod && terser({ compress: true }),
    ].filter(Boolean),
  };
};
