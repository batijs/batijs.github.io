import { Logo } from "components/Logo";
import features from "assets/features.json";
import { createMemo, For, untrack, useContext } from "solid-js";
import Drawer from "./Drawer";
import DrawerContent from "./DrawerContent";
import { Select } from "components/Select";
import { FormControl } from "components/FormControl";
import { copy } from "components/Copy";
import { startViewTransition } from "components/Flip";
import { StoreContext } from "components/Store";

// avoid removing import when trying to optimize them
// https://github.com/solidjs/solid/discussions/845
const _copy = copy;

export default function App() {
  const { featuresValues, inViewFeatures, selectFeature, moveFeature } =
    useContext(StoreContext);
  const keys = Object.keys(features);

  function getFlags() {
    return keys
      .filter((ns) => featuresValues()[ns])
      .map((ns) => `--${featuresValues()[ns]}`);
  }

  const words = createMemo(() => [
    "pnpm",
    "create",
    "@batijs/app",
    ...getFlags(),
    "my-app",
  ]);

  return (
    <Drawer drawer={<DrawerContent />}>
      <div class="container mt-8">
        <div class="w-full items-center flex justify-center gap-8">
          <a class="inline-block" href="/">
            <Logo size={96} />
          </a>
          <h1 class="font-sans font-bold text-8xl pb-4">Bâti</h1>
        </div>
        <div class="w-full items-center flex justify-center mt-8">
          <div class="w-4/5 flex flex-col bg-base-300 px-4 py-8 rounded-xl shadow-2xl">
            <div class="px-4">
              <kbd
                class="w-full text-center tooltip-primary inline-flex tooltip-bottom kbd kbd-lg select-all"
                use:copy
                data-tip="Copied to clipboard!"
              >
                {words().join(" ")}
              </kbd>
            </div>
            <div class="divider"></div>
            <div class="flex flex-row flex-wrap justify-center gap-4">
              <For each={Object.keys(inViewFeatures())}>
                {(ns) => (
                  <FormControl label={inViewFeatures()[ns]!.label}>
                    <div class="input-group">
                      <Select
                        class="grow"
                        disabled={inViewFeatures()[ns]!.disabled}
                        onChange={(e) =>
                          selectFeature(ns, e.target.value || undefined)
                        }
                        options={inViewFeatures()[ns]!.features}
                      />
                      <button
                        class="btn hover:btn-error"
                        title="remove"
                        onClick={() => {
                          startViewTransition(
                            untrack(inViewFeatures)[ns]!.label,
                            () => moveFeature(ns)
                          );
                        }}
                      >
                        -
                      </button>
                    </div>
                  </FormControl>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
