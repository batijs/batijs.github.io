import { Logo } from "components/Logo";
import features from "assets/features.json";
import { createMemo, For, Show, useContext } from "solid-js";
import DrawerContent from "./DrawerContent";
import { copy } from "components/Copy";
import { StoreContext } from "components/Store";
import { flip } from "components/Flip";
import { ChevronRight } from "lucide-solid";

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
  const { featuresValues, inViewFeatures, selectFeature, moveFeature } =
    useContext(StoreContext);
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
        <div class="w-4/5 flex flex-col bg-base-300 px-4 py-8 rounded-xl shadow-2xl">
          <div class="px-4 flex">
            <kbd
              class="group relative flex-1 justify-start pl-10 tooltip-primary inline-flex tooltip-bottom kbd kbd-lg select-all flex-wrap leading-10"
              use:copy
              data-tip="Copied to clipboard!"
            >
              <ChevronRight class="absolute top-2.5 left-2.5 opacity-50" />
              <For each={words()}>
                {({ word }: Word) => (
                  <span class="mr-3 relative whitespace-nowrap">{word}</span>
                )}
              </For>
            </kbd>
          </div>
          <div class="divider"></div>
          <div class="flex flex-row flex-wrap flex-1 justify-center gap-4">
            <DrawerContent />
          </div>
        </div>
      </div>
    </div>
    // </Drawer>
  );
}
