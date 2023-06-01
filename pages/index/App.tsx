import { Logo } from "components/Logo";
import features from "assets/features.json";
import { createMemo, createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";
import Drawer from "./Drawer";
import DrawerContent from "./DrawerContent";
import type { Definition } from "./types";
import { Select } from "components/Select";
import { FormControl } from "components/FormControl";
// ts-ignore is here to avoid removing import when trying to optimize them
// @ts-ignore
import { copy } from "components/Copy";

export default function App() {
  const { framework, ...otherFeatures } = features;
  const [currentFeatures, setCurrentFeatures] = createStore<
    Record<string, Definition>
  >({
    framework,
  });
  const keys = Object.keys(features);
  const [state, setState] = createStore<Record<string, string | undefined>>(
    Object.assign(
      {},
      ...Object.entries(currentFeatures).map(([ns, fs]) => ({
        [ns]: fs.features.find((f) => f.selected)?.value,
      }))
    )
  );

  const [tooltipVisible, setTooltipVisible] = createSignal<boolean>(false);

  function getFlags() {
    return keys.filter((ns) => state[ns]).map((ns) => `--${state[ns]}`);
  }

  const words = createMemo(() => [
    "pnpm",
    "create",
    "@batijs/app",
    ...getFlags(),
    "my-app",
  ]);

  let clear: ReturnType<typeof setTimeout>;

  async function writeSelectionClipboard() {
    clearTimeout(clear);
    const selObj = window.getSelection();
    if (selObj) {
      await navigator.clipboard.writeText(selObj.toString());
      setTooltipVisible(true);

      clear = setTimeout(() => {
        setTooltipVisible(false);
      }, 3000);
    }
  }

  return (
    <Drawer
      drawer={
        <DrawerContent
          features={otherFeatures}
          onAdd={(ns, fs) => {
            setCurrentFeatures(ns, fs);
            setState(ns, fs.features.find((f) => f.selected)?.value);
          }}
        />
      }
    >
      <div class="container mt-8">
        <div class="w-full items-center flex justify-center gap-8">
          <a class="inline-block" href="/">
            <Logo size={96} />
          </a>
          <h1 class="font-sans font-bold text-8xl pb-4">Bâti</h1>
        </div>
        <div class="w-full items-center flex justify-center mt-8">
          <div class="w-4/5 flex flex-col bg-base-300 px-4 py-8 rounded-xl shadow-2xl">
            <div class="flex flex-row flex-wrap justify-center gap-4">
              <For each={Object.keys(currentFeatures)}>
                {(ns) => (
                  <FormControl label={currentFeatures[ns].label}>
                    <Select
                      disabled={currentFeatures[ns].disabled}
                      onChange={(e) =>
                        setState(ns, e.target.value || undefined)
                      }
                      options={currentFeatures[ns].features}
                    />
                  </FormControl>
                )}
              </For>
            </div>
            <div class="divider"></div>
            <div class="px-4">
              <kbd
                class="text-center tooltip-primary inline-flex tooltip-bottom kbd kbd-lg select-all"
                use:copy
                data-tip="Copied to clipboard!"
                onClick={writeSelectionClipboard}
              >
                {words().join(" ")}
              </kbd>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
