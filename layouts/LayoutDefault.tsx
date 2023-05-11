import "./tailwind.css";
import logoUrl from "../assets/logo.svg";
import type { JSX } from "solid-js";

export default function LayoutDefault(props: { children?: JSX.Element }) {
  return (
    <div class="flex max-w-5xl m-auto">
      <Content>{props.children}</Content>
    </div>
  );
}

function Content(props: { children: JSX.Element }) {
  return <div class="container min-h-screen">{props.children}</div>;
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
