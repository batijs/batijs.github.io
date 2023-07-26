import {
  createEffect,
  createMemo,
  createSignal,
  on,
  Show,
  useContext,
} from "solid-js";
import Features from "components/Features";
import { StoreContext } from "components/Store";
import features from "assets/features.json";
import { copy } from "components/Copy";
import { flip } from "components/Flip";
import Presets from "components/Presets";

// avoid removing import when trying to optimize them
// https://github.com/solidjs/solid/discussions/845
const _copy = copy;
const _flip = flip;

const sliderDuration = 300;

export function Widget(props: { theme?: string; widget: boolean }) {
  const { featuresValues, getBottomPanel } = useContext(StoreContext);
  const [getVisibleSliderElements, setVisibleSliderElements] = createSignal([
    getBottomPanel(),
  ]);
  const keys = Object.keys(features);

  createEffect(
    on(
      getBottomPanel,
      (v, pv) => {
        const newElts = [v];
        if (typeof pv === "number") newElts.push(pv);

        setVisibleSliderElements(newElts);
        setTimeout(() => {
          setVisibleSliderElements([v]);
        }, sliderDuration);
      },
      { defer: true },
    ),
  );

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
    <div
      data-theme={props.theme}
      class="flex flex-col bg-base-300 px-4 py-8 rounded-xl shadow-2xl relative bati-widget"
      classList={{
        "w-4/5": !props.widget,
      }}
    >
      <div class="px-4 flex">
        <kbd
          class="group relative flex-1 justify-start pl-10 tooltip-primary text-left inline-flex tooltip-bottom kbd kbd-lg select-all flex-wrap leading-10 gap-2.5"
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
          {words().join(" ")}
        </kbd>
      </div>
      <div class="divider"></div>
      <div class="w-full overflow-hidden">
        <div
          class={`flex w-full relative transform transition-transform duration-${sliderDuration} py-1`}
          style={{
            "--tw-translate-x": getBottomPanel() * -100 + "%",
          }}
        >
          <div class="flex-grow flex-shrink-0 basis-full">
            <Show when={getVisibleSliderElements().includes(0)}>
              <Presets />
            </Show>
          </div>
          <div class="flex-grow flex-shrink-0 basis-full">
            <Show when={getVisibleSliderElements().includes(1)}>
              <Features />
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
}
