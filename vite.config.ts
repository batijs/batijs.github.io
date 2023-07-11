import solid from "vike-solid/vite";
import { build, defineConfig, type Plugin } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import daisyui from "daisyui";
import solidPlugin from "vite-plugin-solid";

const writeToDisk: () => Plugin = () => {
  let building = false;
  return {
    name: "write-to-disk",
    apply: "serve",
    handleHotUpdate: async ({ file, server }) => {
      if (building) return;
      building = true;

      server.config.logger.info(`${file} updated. Rebuilding Web Component`, {
        timestamp: true,
      });

      await build({
        mode: "widget",
        configFile: "./vite.config.ts",
      });

      building = false;
    },
  };
};

export default defineConfig(({ mode, command }) => {
  if (mode === "widget") {
    return {
      build: {
        lib: {
          entry: "pages/index/Index.element.ts",
          formats: ["es"],
          fileName: "full",
        },
        outDir: "dist/elements",
        rollupOptions: {
          output: {
            manualChunks: undefined,
          },
        },
      },
      server: {
        watch: {
          ignored: ["dist/**"],
        },
      },
      define: {
        "process.env.NODE_ENV": JSON.stringify("production"),
      },
      css: {
        postcss: {
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
              postcssPlugin: "fix-css-wc-scope",
              Rule(rule) {
                rule.selector = rule.selector.replaceAll(
                  ":root",
                  ".bati-widget"
                );
              },
            },
          ],
        },
      },
      plugins: [
        tsConfigPaths(),
        solidPlugin(),
        command === "serve" ? writeToDisk() : undefined,
      ],
    };
  }

  if (mode === "pages") {
    return {
      plugins: [
        tsConfigPaths(),
        solid({
          vps: {
            prerender: true,
            disableAutoFullBuild: false,
          },
        }),
      ],
    };
  }

  throw new Error(`Unsupported vite build mode "${mode}"`);
});
