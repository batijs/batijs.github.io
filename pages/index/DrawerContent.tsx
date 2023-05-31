import { For } from "solid-js";
import type { Definition } from "./types";
import { FormControl } from "components/FormControl";
import { Select } from "components/Select";
import { createStore, produce } from "solid-js/store";

export default function DrawerContent(props: {
  features: Record<string, Definition>;
  onAdd: (ns: string, def: Definition) => void;
}) {
  const [currentFeatures, setCurrentFeatures] = createStore<
    Record<string, Definition>
  >(props.features);

  return (
    <ul class="menu p-4 w-80 bg-base-300 text-base-content">
      <For each={Object.entries(currentFeatures)}>
        {([ns, fs]) => (
          <FormControl label={fs.label}>
            <div class="input-group">
              <Select
                class="grow text-xs"
                disabled={fs.disabled}
                onChange={(e) => {
                  setCurrentFeatures(
                    ns,
                    "features",
                    fs.features.map((f) => ({
                      ...f,
                      selected: e.target.value
                        ? e.target.value === f.value
                        : f.label === "none",
                    }))
                  );
                }}
                options={fs.features}
              />
              <button
                class="btn btn-primary"
                disabled={fs.disabled}
                onClick={() => {
                  props.onAdd(ns, JSON.parse(JSON.stringify(fs)));
                  setCurrentFeatures(
                    produce((s) => {
                      delete s[ns];
                    })
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
