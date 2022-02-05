import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import svgr from "@svgr/rollup";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import del from "rollup-plugin-delete";
import replace from "@rollup/plugin-replace";
import pkg from "./package.json";

const dev = process.env.APP_ENV === "development";
const prod = process.env.APP_ENV === "production";

export default {
  input: "./src/index.ts",
  output: [
    {
      format: "esm",
      file: pkg.module,
      sourcemap: dev ? "inline" : prod,
    },
    {
      name: "myLibrary",
      format: "umd",
      file: pkg.main,
      sourcemap: dev ? "inline" : prod,
      exports: "named",
    },
  ],
  plugins: [
    // TODO: Add Banner Plugin for minified files
    del({
      targets: "./lib/*",
      runOnce: true,
    }),
    svgr(),
    postcss({
      autoModules: true,
      inject: function (cssVariablesNames, fieldId) {
        console.log(cssVariablesNames, fieldId);
      },
      extensions: [".css"],
    }),
    typescript({ tsconfig: "./tsconfig.json" }),
    nodeResolve({
      browser: true,
    }),
    commonjs({
      include: /node_modules/,
    }),
    babel({
      exclude: /node_modules/,
      babelHelpers: "runtime",
    }),
    prod && terser({ compress: true, output: { comments: false }, mangle: prod }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(prod ? "production" : dev && "development"),
      preventAssignment: true,
    }),
  ].filter(Boolean),
};
