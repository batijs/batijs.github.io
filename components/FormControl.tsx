import { type JSX } from "solid-js";
import { flip } from "./Flip";
import clsx from "clsx";

// avoid removing import when trying to optimize them
// https://github.com/solidjs/solid/discussions/845
const _flip = flip;

export function FormControl(props: {
  children: JSX.Element;
  label: string;
  flipLabel?: string;
  class?: string;
}) {
  return (
    <div
      class={clsx("form-control sm:max-w-xs", props.class)}
      use:flip={props.flipLabel}
    >
      <label class="label">
        <span class="label-text">{props.label}</span>
      </label>
      {props.children}
    </div>
  );
}
