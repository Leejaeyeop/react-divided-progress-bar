import { babel } from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import autoprefixer from "autoprefixer";
import postcss from "rollup-plugin-postcss";
import cssimport from "postcss-import";
import cleaner from "rollup-plugin-cleaner";
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";

const config = {
  external: Object.keys(pkg.peerDependencies || {}),
  input: "./src/index.tsx", // 진입점
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
      exports: "named",
    },
  ],
  plugins: [
    cleaner({
      targets: ["./dist/"],
    }),
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
    terser(),
  ],
};

export default config;
