import { babel } from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import autoprefixer from "autoprefixer";
import postcss from "rollup-plugin-postcss";
import cssimport from "postcss-import";
import pkg from "./package.json";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  external: [],
  input: "./src/index.tsx", // 진입점
  output: [
    {
      file: pkg.main,
      format: "cjs", // cjs로 output
      sourcemap: true,
      banner: "/* eslint-disable no-unused-expressions, no-undef */",
    },
  ],
  plugins: [
    peerDepsExternal(),
    nodeResolve(),
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      presets: ["@babel/env", "@babel/react", "@babel/preset-typescript"],
    }),
    commonjs(),
    typescript(), // typescript compile
    postcss({
      plugins: [cssimport(), autoprefixer()],
    }),
  ],
};
