import { createStore } from "solid-js/store";
import features from "assets/features.json";
import {
  batch,
  createContext,
  createMemo,
  createSignal,
  type JSX,
} from "solid-js";
import type { Definition } from "../types";

export type Features = keyof typeof features;

function filteredObject<T extends object>(
  obj: T,
  filter: (obj: T, k: keyof T) => boolean,
) {
  return Object.keys(obj).reduce(function (r, e) {
    if (filter(obj, e as keyof T)) r[e as keyof T] = obj[e as keyof T];
    return r;
  }, {} as Partial<T>);
}

function initStore() {
  const [currentFeatures, setCurrentFeatures] =
    createStore<Record<Features, Definition>>(features);

  const inViewFeatures = createMemo(() =>
    filteredObject(currentFeatures, (o, k) => Boolean(o[k].inview)),
  );

  const drawerFeatures = createMemo(() =>
    filteredObject(currentFeatures, (o, k) => !o[k].inview),
  );

  function moveFeature(k: Features) {
    setCurrentFeatures(k, "inview", (val) => !val);
  }

  function selectFeature(k: Features, value: unknown) {
    setCurrentFeatures(k, "features", (fs) => {
      return fs.map((f) => ({
        ...f,
        selected: value
          ? value === f.value
          : (features as Record<string, Definition>)[k].features.find(
              (f2) => f2.value === f.value,
            )?.selected,
      }));
    });
  }

  const featuresValues = createMemo<Record<string, string | undefined>>(() =>
    Object.assign(
      {},
      ...Object.entries(inViewFeatures()).map(([ns, fs]) => ({
        [ns]: fs!.features.find((f) => f.selected)?.value,
      })),
    ),
  );

  const [getBottomPanel, setBottomPanel] = createSignal(0);

  function selectPreset(ks: Features[]) {
    batch(() => {
      (Object.keys(currentFeatures) as Features[]).forEach((k) => {
        setCurrentFeatures(k, "inview", ks.includes(k));
      });
      setBottomPanel(1);
    });
  }

  return {
    inViewFeatures,
    drawerFeatures,
    moveFeature,
    selectFeature,
    featuresValues,
    currentFeatures,
    getBottomPanel,
    setBottomPanel,
    selectPreset,
  };
}

export const StoreContext = createContext<ReturnType<typeof initStore>>(
  undefined as unknown as ReturnType<typeof initStore>,
);

export function StoreProvider(props: { children: JSX.Element }) {
  const store = initStore();

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
}
