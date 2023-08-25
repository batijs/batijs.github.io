import { createMemo, For, useContext } from "solid-js";
import { FormControl } from "components/FormControl";
import { type Features, StoreContext } from "components/Store";
import { ListBox } from "components/ListBox";

export default function Features() {
  const { currentFeatures, selectFeature, moveFeature, setBottomPanel } =
    useContext(StoreContext);

  const keys = createMemo(() => Object.keys(currentFeatures) as Features[]);

  return (
    <>
      <div class="grid grid-cols-[repeat(auto-fit,_minmax(14rem,_1fr))] gap-4 px-4 box-border w-full relative guy">
        <span
          class="absolute -top-2 right-4 link link-hover opacity-80 hover:opacity-100 z-30"
          onClick={() => setBottomPanel(0)}
        >
          ← presets
        </span>

        <For each={keys()}>
          {(ns, i) => {
            const f = currentFeatures[ns];
            return (
              <FormControl
                label={f.label}
                flipLabel={ns}
                class="w-full sm:w-auto"
                // @ts-ignore
                style={{
                  "z-index": keys().length - i(),
                }}
              >
                <div class="join group w-full">
                  <div
                    class="join-item flex justify-center items-center px-2 border-2 border-r-0 border-solid bg-base-100"
                    classList={{
                      "border-success/60": Boolean(f.inview),
                      "border-base-200 bg-base-200 opacity-70": Boolean(
                        f.disabled,
                      ),
                      "border-primary/60": !f.inview && !f.disabled,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={f.inview}
                      classList={{
                        "checkbox-success": Boolean(f.inview),
                        "border-solid": !f.disabled,
                      }}
                      class="checkbox rounded bg-base-100"
                      disabled={f.disabled}
                      onChange={() => moveFeature(ns)}
                    />
                  </div>
                  <ListBox
                    id={ns}
                    class="join-item border-l-0 pl-1 w-full"
                    disabled={f.disabled}
                    classList={{
                      "listbox-primary": !f.inview,
                      "listbox-success": Boolean(f.inview),
                    }}
                    onChange={(value) => selectFeature(ns, value || undefined)}
                    options={f.features}
                  />
                </div>
              </FormControl>
            );
          }}
        </For>
      </div>
    </>
  );
}
