import { nodeResolve } from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import tsConfigPaths from "rollup-plugin-tsconfig-paths";
import json from "@rollup/plugin-json";
import image from "@rollup/plugin-image";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import daisyui from "daisyui";
import replace from "@rollup/plugin-replace";

export default {
  external: [],
  input: "pages/index/Index.element.ts",
  output: [
    {
      file: "dist/elements/full.js",
      format: "es",
    },
  ],
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    postcss({
      config: false,
      extensions: [".css", ".module.css"],
      inject: true,
      plugins: [
        autoprefixer(),
        tailwindcss({
          corePlugins: {
            preflight: false,
          },
          content: [
            "./{pages,layouts,components,src}/**/*.{html,js,jsx,ts,tsx}",
          ],
          theme: {
            extend: {},
          },
          plugins: [daisyui],
        }),
      ],
    }),
    tsConfigPaths(),
    nodeResolve(),
    typescript({
      sourceMap: false,
    }),
    json(),
    image(),
    babel({
      extensions: [".ts", ".tsx"],
      babelHelpers: "bundled",
      presets: [["solid", { generate: "dom", hydratable: true }]],
    }),
    terser(),
  ],
};
