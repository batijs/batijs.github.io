import { createMemo, For, useContext } from "solid-js";
import { FormControl } from "#components/FormControl";
import { type Features, StoreContext } from "#components/Store";

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
                class="w-full sm:w-auto border-solid border-2 rounded-md bg-base-200"
                classList={{
                  "border-success/60": Boolean(f.inview),
                  "border-base-200 opacity-70": Boolean(f.disabled),
                  "border-primary/60": !f.inview && !f.disabled,
                }}
                // @ts-ignore
                style={{
                  "z-index": keys().length - i(),
                }}
              >
                <div class="grid grid-rows-3 group w-full gap-2 py-2 h-32 -mt-3">
                  <For each={f.features}>
                    {(feature) => (
                      <label
                        class="flex"
                        classList={{
                          "opacity-50 cursor-not-allowed":
                            f.disabled || feature.disabled,
                        }}
                      >
                        <div class="flex justify-center items-center px-2.5">
                          <input
                            type="checkbox"
                            checked={f.inview && feature.selected}
                            classList={{
                              "checkbox-success": Boolean(
                                f.inview && feature.selected,
                              ),
                              "border-solid": !(f.disabled || feature.disabled),
                            }}
                            class="checkbox rounded"
                            disabled={f.disabled || feature.disabled}
                            onChange={(event) => {
                              selectFeature(ns, feature.value);
                              if (!f.inview || !event.currentTarget.checked) {
                                moveFeature(ns);
                              }
                            }}
                          />
                        </div>
                        <div class="inline-flex gap-2 items-center">
                          {feature.image && (
                            <img
                              class="max-w-5 max-h-5"
                              src={feature.image}
                              alt={`${feature.value} logo`}
                            />
                          )}
                          <div class="inline-flex flex-col gap-0 leading-5">
                            <span>{feature.label}</span>
                            {feature.alt && (
                              <span class="text-xs">{feature.alt}</span>
                            )}
                          </div>
                        </div>
                      </label>
                    )}
                  </For>
                  {/*<ListBox*/}
                  {/*  id={ns}*/}
                  {/*  class="join-item border-l-0 pl-1 w-full"*/}
                  {/*  disabled={f.disabled}*/}
                  {/*  classList={{*/}
                  {/*    "listbox-primary": !f.inview,*/}
                  {/*    "listbox-success": Boolean(f.inview),*/}
                  {/*  }}*/}
                  {/*  onChange={(value) => selectFeature(ns, value || undefined)}*/}
                  {/*  options={f.features}*/}
                  {/*/>*/}
                </div>
              </FormControl>
            );
          }}
        </For>
      </div>
    </>
  );
}
