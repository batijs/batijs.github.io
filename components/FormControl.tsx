import { type JSX } from "solid-js";
import { flip } from "./Flip";

// avoid removing import when trying to optimize them
// https://github.com/solidjs/solid/discussions/845
const _flip = flip;

export function FormControl(props: {
  children: JSX.Element;
  label: string;
  class?: string;
}) {
  return (
    <div
      class={"form-control w-full max-w-xs " + (props.class ?? "")}
      use:flip={props.label}
    >
      <label class="label">
        <span class="label-text">{props.label}</span>
      </label>
      {props.children}
    </div>
  );
}
