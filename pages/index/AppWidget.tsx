import type { JSX } from "solid-js";
import css from "layouts/tailwind.css?inline";
import { StoreProvider } from "components/Store";
import { Widget } from "components/Widget";

function LayoutDefault(props: { children?: JSX.Element }) {
  return (
    <StoreProvider>
      <style>{css}</style>
      {props.children}
    </StoreProvider>
  );
}

export default function AppWidget(props: { theme?: string }) {
  return (
    <LayoutDefault>
      <Widget widget={true} theme={props.theme} />
    </LayoutDefault>
  );
}
