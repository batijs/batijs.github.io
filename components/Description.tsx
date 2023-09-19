import { createMemo, useContext } from "solid-js";
import { StoreContext } from "#components/Store";
import clsx from "clsx";

const lf = new Intl.ListFormat("en");

export default function Description() {
  const { featuresLabels } = useContext(StoreContext);

  const formattedLabels = createMemo(() =>
    lf
      .formatToParts(["Vike", ...featuresLabels()])
      .map((p) =>
        p.type === "literal" ? (
          p.value
        ) : (
          <span
            class={clsx("text-error", p.value === "Vike" && "font-semibold")}
          >
            {p.value}
          </span>
        ),
      ),
  );

  return (
    <span class="text-lg">Scaffolds a web app using {formattedLabels()}.</span>
  );
}
