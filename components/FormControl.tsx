import { type JSX } from "solid-js";
// ts-ignore is here to avoid removing import when trying to optimize them
// @ts-ignore
import { flip } from "./Flip";

export function FormControl(props: { children: JSX.Element; label: string }) {
  return (
    <div class="form-control w-full max-w-xs" use:flip={props.label}>
      <label class="label">
        <span class="label-text">{props.label}</span>
      </label>
      {props.children}
    </div>
  );
}
