import solid from "vike-solid/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    solid({
      vps: {
        prerender: true,
        disableAutoFullBuild: false,
      },
    }),
  ],
});
