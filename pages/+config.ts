import type { Config } from "vike-solid";
import Layout from "../layouts/LayoutDefault";
import Head from "../layouts/Head";

// Default config (can be overriden by pages)
export default {
  prerender: true,
  Layout: Layout,
  Head: Head,
  // <title>
  title: "Bati",
  // <meta name="description">
  description: "Bati",
} satisfies Config;
