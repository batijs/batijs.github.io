import { onCleanup } from "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      copy: boolean;
    }
  }
}

export function copy(el: HTMLElement) {
  let clear: ReturnType<typeof setTimeout>;

  async function writeSelectionClipboard() {
    clearTimeout(clear);
    const selObj = window.getSelection();
    if (selObj) {
      await navigator.clipboard.writeText(selObj.toString());
      el.classList.add("tooltip", "tooltip-open");

      clear = setTimeout(() => {
        el.classList.remove("tooltip", "tooltip-open");
      }, 3000);
    }
  }

  el.addEventListener("click", writeSelectionClipboard);

  onCleanup(() => el.removeEventListener("click", writeSelectionClipboard));
}
