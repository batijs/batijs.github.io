import solid from "vike-solid/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
  base: mode === "pages" ? "/batijs.github.io/" : undefined,
  plugins: [
    tsconfigPaths(),
    solid({
      vps: {
        prerender: true,
        disableAutoFullBuild: false,
      },
    }),
  ],
}));
