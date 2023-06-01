import { For, untrack, useContext } from "solid-js";
import { FormControl } from "components/FormControl";
import { Select } from "components/Select";
import { startViewTransition } from "components/Flip";
import { StoreContext } from "components/Store";

export default function DrawerContent() {
  const { drawerFeatures, selectFeature, moveFeature } =
    useContext(StoreContext);

  return (
    <ul class="menu p-4 w-80 bg-base-300 text-base-content">
      <For each={Object.keys(drawerFeatures())}>
        {(ns) => (
          <FormControl label={drawerFeatures()[ns]!.label}>
            <div class="input-group">
              <Select
                class="grow text-xs"
                disabled={drawerFeatures()[ns]!.disabled}
                onChange={(e) => {
                  selectFeature(ns, e.target.value || undefined);
                }}
                options={drawerFeatures()[ns]!.features}
              />
              <button
                class="btn btn-primary"
                disabled={drawerFeatures()[ns]!.disabled}
                onClick={() => {
                  startViewTransition(untrack(drawerFeatures)[ns]!.label, () =>
                    moveFeature(ns)
                  );
                }}
              >
                +
              </button>
            </div>
          </FormControl>
        )}
      </For>
    </ul>
  );
}
