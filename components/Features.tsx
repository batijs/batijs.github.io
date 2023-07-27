import { For, useContext } from "solid-js";
import { FormControl } from "components/FormControl";
import { Select } from "components/Select";
import { type Features, StoreContext } from "components/Store";

export default function Features() {
  const { currentFeatures, selectFeature, moveFeature, setBottomPanel } =
    useContext(StoreContext);

  return (
    <>
      <div class="flex flex-wrap gap-4 px-4 box-border w-full relative">
        <span
          class="absolute -top-2 right-4 link link-hover opacity-80 hover:opacity-100"
          onClick={() => setBottomPanel(0)}
        >
          ← presets
        </span>

        <For each={Object.keys(currentFeatures) as Features[]}>
          {(ns) => {
            const f = currentFeatures[ns];
            return (
              <FormControl
                label={f.label}
                flipLabel={ns}
                class="w-full sm:w-auto"
              >
                <div class="join group w-full">
                  <div
                    class="join-item flex justify-center items-center px-2 border border-solid bg-base-100"
                    classList={{
                      "border-success": Boolean(f.inview),
                      "border-base-200 bg-base-200 opacity-70": Boolean(
                        f.disabled,
                      ),
                      "border-primary": !f.inview && !f.disabled,
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
                  <Select
                    class="text-xs join-item border-l-0 pl-1 w-full"
                    classList={{
                      "select-primary": !f.inview,
                      "select-success": Boolean(f.inview),
                    }}
                    disabled={f.disabled}
                    onChange={(e) => {
                      selectFeature(ns, e.target.value || undefined);
                    }}
                    options={f.features}
                  />
                </div>
              </FormControl>
            );
          }}
        </For>
      </div>
      {/*<div class="w-full px-4 relative mt-6 text-sm">*/}
      {/*  <ul class="list-custom">*/}
      {/*    <li class="list-star list-colon">*/}
      {/*      Recommended by Bati's team. We favour tools that:*/}
      {/*      <ul class="list-custom list-circle pl-4">*/}
      {/*        <li>*/}
      {/*          Respect JavaScript standards (see{" "}*/}
      {/*          <a*/}
      {/*            class="link"*/}
      {/*            href="https://wintercg.org"*/}
      {/*            referrerPolicy="no-referrer"*/}
      {/*            target="_blank"*/}
      {/*          >*/}
      {/*            WinterCG*/}
      {/*          </a>*/}
      {/*          )*/}
      {/*        </li>*/}
      {/*        <li>Are simple, performant and actively maintained</li>*/}
      {/*        <li>Are not tied to a specific framework</li>*/}
      {/*      </ul>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</div>*/}
    </>
  );
}
