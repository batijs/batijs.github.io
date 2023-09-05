import { features } from "@batijs/core";
import featuresWeb from "../assets/features.json" assert { type: "json" };
import { setOutput } from "@actions/core";

const nss = new Set(Object.keys(featuresWeb));

interface State {
  missingNss: Set<string>;
  missingFeatures: {
    ns: string;
    value: string;
  }[];
}

function checkFeatures(): State {
  const state: State = {
    missingNss: new Set(),
    missingFeatures: [],
  };

  for (const feature of features) {
    const [ns, v] = feature.split(":");

    if (!nss.has(ns)) {
      state.missingNss.add(ns);
    }
    if (
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
  let text = "";

  if (state.missingNss.size > 0) {
    text += "New namespaces:";
    text += "\n- " + Array.from(state.missingNss).join("\n- ");
    text += "\n\n";
  }

  if (state.missingFeatures.length > 0) {
    text += "New features:";
    text +=
      "\n- " +
      state.missingFeatures
        .map(({ ns, value }) => `${ns}:${value}`)
        .join("\n- ");
    text += "\n\n";
  }

  setOutput("missing", state.missingNss.size + state.missingFeatures.length);
  setOutput("text", text);
}

main();
