import { useContext } from "solid-js";
import { type Features, StoreContext } from "components/Store";

function Preset(props: {
  title: string;
  description: string;
  features: Features[];
  class?: string;
  titleClass?: string;
  disabled?: boolean;
}) {
  const { selectPreset } = useContext(StoreContext);

  return (
    <button
      type="button"
      class={"card card-compact border-0 bg-base-100 " + (props.class ?? "")}
      onclick={() => !props.disabled && selectPreset(props.features)}
      classList={{
        "cursor-default opacity-50": props.disabled,
      }}
    >
      <div class="card-body">
        <h2 class={"card-title " + (props.titleClass ?? "")}>{props.title}</h2>
        <p class="text-left">{props.description}</p>
      </div>
    </button>
  );
}

export default function Presets() {
  return (
    <div class="w-full px-4 box-border grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <Preset
        title="Plain Vike"
        class="hover:outline outline-amber-500 outline-1 outline-offset-2"
        titleClass="underline decoration-amber-500"
        description="For trying out Vike, or manually assembling your stack"
        features={["framework"]}
      />
      <Preset
        title="Frontend only"
        class="hover:outline outline-sky-500 outline-1 outline-offset-2"
        titleClass="underline decoration-sky-500"
        description="If a backend isn't needed, or a backend already exists"
        features={["framework", "uikit"]}
      />
      <Preset
        title="Full-stack"
        class="hover:outline outline-fuchsia-700 outline-1 outline-offset-2"
        titleClass="underline decoration-fuchsia-700"
        description="Frontend + Server + Database"
        features={["framework", "rpc", "auth", "db", "uikit", "server"]}
      />
      <Preset
        title="E-commerce"
        description="E-commerce website powered by Shopify or BigCommerce."
        features={["framework"]}
        disabled={true}
      />
    </div>
  );
}
