import { type JSX } from "solid-js";

export function FormControl(props: { children: JSX.Element; label: string }) {
  return (
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">{props.label}</span>
      </label>
      {props.children}
    </div>
  );
}
