import { features } from "@batijs/core";
import featuresWeb from "../assets/features.json" assert { type: "json" };
import { setOutput } from "@actions/core";

const nss = new Set(Object.keys(featuresWeb));

interface State {
  missingNss: string[];
  missingFeatures: {
    ns: string;
    value: string;
  }[];
}

function checkFeatures(): State {
  const state: State = {
    missingNss: [],
    missingFeatures: [],
  };

  for (const feature of features) {
    const [ns, v] = feature.split(":");

    if (!nss.has(ns)) {
      state.missingNss.push(ns);
    } else if (
      !featuresWeb[ns as keyof typeof featuresWeb].features.some(
        (f) => f.value === v,
      )
    ) {
      state.missingFeatures.push({
        ns,
        value: v,
      });
    }
  }

  return state;
}

function main() {
  const state = checkFeatures();

  setOutput("missingNss", JSON.stringify(state.missingNss));
  setOutput("missingFeatures", JSON.stringify(state.missingFeatures));
}

main();
