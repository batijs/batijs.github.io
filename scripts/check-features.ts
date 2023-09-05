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

    // if (!nss.has(ns)) {
    if (nss.has(ns)) {
      state.missingNss.push(ns);
    } else if (
      // !featuresWeb[ns as keyof typeof featuresWeb].features.some(
      featuresWeb[ns as keyof typeof featuresWeb].features.some(
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
  let text = "";

  if (state.missingNss.length > 0) {
    text += "New namespaces:";
    text += "\n- " + state.missingNss.join("\n- ");
  }

  if (state.missingFeatures.length > 0) {
    text += "New features:";
    text +=
      "\n- " +
      state.missingFeatures
        .map(({ ns, value }) => `${ns}:${value}`)
        .join("\n- ");
  }

  setOutput("missing", state.missingNss.length + state.missingFeatures.length);
  setOutput("text", text);
}

main();
