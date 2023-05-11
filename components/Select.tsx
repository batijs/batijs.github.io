import { For, type JSX, splitProps } from "solid-js";

export function Select(
  props: JSX.OptionHTMLAttributes<HTMLSelectElement> & {
    options: JSX.OptionHTMLAttributes<HTMLOptionElement>[];
  }
) {
  const [local, others] = splitProps(props, ["options"]);
  return (
    <select class="select w-full max-w-xs" {...others}>
      <For each={local.options}>
        {(option) => (
          <option
            disabled={option.disabled}
            selected={option.selected}
            value={option.value}
          >
            {option.label}
          </option>
        )}
      </For>
    </select>
  );
}
