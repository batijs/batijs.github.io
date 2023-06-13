import { nodeResolve } from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import tsConfigPaths from "rollup-plugin-tsconfig-paths";
import json from "@rollup/plugin-json";
import image from "@rollup/plugin-image";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import daisyui from "daisyui";
import esbuild from "rollup-plugin-esbuild";

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
    postcss({
      config: false,
      extensions: [".css"],
      inject: false,
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
          daisyui: {
            themes: ["light", "dark"],
          },
          plugins: [daisyui],
        }),
        {
          postcssPlugin: "guy-guyt",
          Rule(rule) {
            rule.selector = rule.selector.replaceAll(":root", ".bati-widget");
          },
        },
      ],
    }),
    tsConfigPaths(),
    nodeResolve(),
    json(),
    image(),
    esbuild({
      sourceMap: false,
      minify: false,
      target: "es2020",
      define: {
        "process.env.NODE_ENV": JSON.stringify("production"),
      },
      tsconfig: "tsconfig.json",
    }),
    babel({
      extensions: [".ts", ".tsx"],
      babelHelpers: "bundled",
      presets: [["solid", { generate: "dom", hydratable: true }]],
    }),
  ],
};
