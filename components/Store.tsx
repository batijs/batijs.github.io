import { createStore } from "solid-js/store";
import features from "../assets/features.json";
import { batch, createContext, createMemo, type JSX } from "solid-js";
import type { Definition } from "../types";
import Features from "#components/Features";

export type Features = keyof typeof features;
export type FeaturesAll = `${Features}:${string}`;

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

  const featuresLabels = createMemo<string[]>(
    () =>
      Object.values(inViewFeatures())
        .map((fs) => fs!.features.find((f) => f.selected)?.label)
        .filter(Boolean) as string[],
  );

  function selectPreset(ks: (Features | FeaturesAll)[]) {
    const nms: Features[] = ks.map((k) =>
      k.includes(":") ? (k.split(":")[0] as Features) : (k as Features),
    );

    const fts: FeaturesAll[] = ks.filter((k): k is FeaturesAll =>
      k.includes(":"),
    );

    batch(() => {
      (Object.keys(currentFeatures) as Features[]).forEach((k) => {
        setCurrentFeatures(k, "inview", nms.includes(k));
      });
      fts.forEach((ft) => {
        const [namespace, f] = ft.split(":");
        selectFeature(namespace as Features, f);
      });
    });
  }

  return {
    inViewFeatures,
    moveFeature,
    selectFeature,
    featuresValues,
    featuresLabels,
    currentFeatures,
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
