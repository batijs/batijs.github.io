/**
 * @see {@link https://developer.chrome.com/docs/web-platform/view-transitions}
 */

import type { Accessor } from "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      flip: string;
    }
  }
}

export function flip(el: HTMLElement, accessor: Accessor<string>) {
  const name = accessor();
  el.setAttribute("data-flip-name", name);
  (el.style as any).viewTransitionName = name;
}

export function startViewTransition(name: string, callback: () => void) {
  const ref: HTMLElement | null = document.querySelector(
    `[data-flip-name="${name}"]`
  );

  if (!ref || !("startViewTransition" in document)) {
    callback();
    return;
  }

  (ref.style as any).viewTransitionName = name;

  (document.startViewTransition as Function)(() => {
    (ref.style as any).viewTransitionName = "";

    callback();
  });
}
