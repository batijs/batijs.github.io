import type {Config} from "vike-solid";
import Layout from "../layouts/LayoutDefault";

// Default config (can be overriden by pages)
export default {
  prerender: true,
  Layout,
  // <title>
  title: "Bati",
  // <meta name="description">
  description: "Bati",
} satisfies Config;
