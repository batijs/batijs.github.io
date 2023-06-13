import { For, useContext } from "solid-js";
import { FormControl } from "components/FormControl";
import { Select } from "components/Select";
import { StoreContext } from "components/Store";

export default function Features() {
  const { currentFeatures, selectFeature, moveFeature } =
    useContext(StoreContext);

  return (
    <ul class="flex flex-wrap gap-4 px-4 w-full">
      <For each={Object.keys(currentFeatures)}>
        {(ns) => {
          const f = currentFeatures[ns];
          return (
            <FormControl label={f.label} flipLabel={ns}>
              <div class="join group">
                <div
                  class="join-item flex justify-center items-center px-2 border bg-base-100"
                  classList={{
                    "border-success": f.inview,
                    "border-base-200 bg-base-200 opacity-70": f.disabled,
                    "border-primary": !f.disabled,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={f.inview}
                    classList={{
                      "checkbox-success": f.inview,
                    }}
                    class="checkbox rounded bg-base-100"
                    disabled={f.disabled}
                    onChange={() => moveFeature(ns)}
                  />
                </div>
                <Select
                  class="text-xs join-item border-l-0 pl-1"
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
    </ul>
  );
}
