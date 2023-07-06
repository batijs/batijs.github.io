import { customElement } from "solid-element";
import AppWidget from "./AppWidget";

customElement("bati-widget", { theme: "" }, AppWidget);
if (import.meta.hot) {
  import.meta.hot.on("force-reload", (data) => {
    console.log("GUY");
  });
}
