import type { JSX } from "solid-js";
import css from "layouts/tailwind.css";
import { StoreProvider } from "components/Store";
import App from "./App";

function LayoutDefault(props: { children?: JSX.Element }) {
  return (
    <StoreProvider>
      <style>{css}</style>
      <div class="flex flex-col mx-auto">{props.children}</div>
    </StoreProvider>
  );
}

export default function AppWithLayout() {
  return (
    <LayoutDefault>
      <App />
    </LayoutDefault>
  );
}
