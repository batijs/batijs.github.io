import { Logo } from "components/Logo";
import features from "assets/features.json";
import { createMemo, For, Show, useContext } from "solid-js";
import Features from "./Features";
import { copy } from "components/Copy";
import { StoreContext } from "components/Store";
import { flip } from "components/Flip";

// avoid removing import when trying to optimize them
// https://github.com/solidjs/solid/discussions/845
const _copy = copy;
const _flip = flip;

interface Word {
  word: string;
  ns?: string;
}

function word(w: string, ns?: string): Word {
  return {
    word: w,
    ns,
  };
}

export default function App(props: { widget?: boolean }) {
  const { featuresValues } = useContext(StoreContext);
  const keys = Object.keys(features);

  function getFlags() {
    return keys
      .filter((ns) => featuresValues()[ns])
      .map((ns) => word(`--${featuresValues()[ns]}`, ns));
  }

  const words = createMemo(() => [
    word("pnpm"),
    word("create"),
    word("@batijs/app"),
    ...getFlags(),
    word("my-app"),
  ]);

  return (
    // <Drawer drawer={<DrawerContent />}>
    <div class="container mt-8">
      <Show when={!props.widget}>
        <div class="w-full items-center flex justify-center gap-8">
          <a class="inline-block" href="/">
            <Logo size={96} />
          </a>
          <h1 class="font-sans font-bold text-8xl pb-4">Bâti</h1>
        </div>
      </Show>
      <div class="w-full items-center flex justify-center mt-8">
        <div class="w-4/5 flex flex-col bg-base-300 px-4 py-8 rounded-xl shadow-2xl relative">
          <div class="px-4 flex">
            <kbd
              class="group relative flex-1 justify-start pl-10 tooltip-primary inline-flex tooltip-bottom kbd kbd-lg select-all flex-wrap leading-10 gap-2.5"
              use:copy
              data-tip="Copied to clipboard!"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-chevron-right absolute top-2.5 left-2.5 opacity-50"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <For each={words()}>
                {({ word }: Word) => (
                  <span class="relative whitespace-nowrap">{word}</span>
                )}
              </For>
            </kbd>
          </div>
          <div class="divider"></div>
          <div class="flex flex-row flex-wrap flex-1 justify-center gap-4">
            <Features />
          </div>
          {/*<Show when={!props.widget}>*/}
          {/*  <div class="absolute right-2 bottom-2 overflow-hidden opacity-60 group flex gap-2 text-sm items-end">*/}
          {/*    <span class="hidden group-hover:inline">Powered by Bâti</span>*/}
          {/*    <Logo class="rounded-md" size={24} />*/}
          {/*  </div>*/}
          {/*</Show>*/}
        </div>
      </div>
    </div>
    // </Drawer>
  );
}
