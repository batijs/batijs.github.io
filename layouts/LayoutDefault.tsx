import "./tailwind.css";
import css from "./tailwind.css?inline";
import logoUrl from "../assets/logo.svg";
import type { JSX } from "solid-js";

export default function LayoutDefault(props: { children?: JSX.Element }) {
  return (
    <>
      {process.env.NODE_ENV === "production" ? <style>{css}</style> : ""}
      <div class="flex flex-col mx-auto">{props.children}</div>
    </>
  );
}

function Logo() {
  return (
    <div class="p-5 mb-2">
      <a href="/">
        <img alt="Bâti logo" src={logoUrl} height={128} width={128} />
      </a>
    </div>
  );
}

function Attributions() {
  return (
    <a href="https://www.flaticon.com/free-icons/wall" title="wall icons">
      Wall icons created by Freepik - Flaticon
    </a>
  );
}
