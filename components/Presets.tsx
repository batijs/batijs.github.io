import { useContext } from "solid-js";
import { type Features, StoreContext } from "components/Store";

function Preset(props: {
  title: string;
  description: string;
  features: Features[];
  disabled?: boolean;
}) {
  const { selectPreset } = useContext(StoreContext);

  return (
    <button
      type="button"
      class="card card-compact bg-base-100 transition-opacity"
      onclick={() => selectPreset(props.features)}
      classList={{
        "cursor-default opacity-50": props.disabled,
        "hover:opacity-80": !props.disabled,
      }}
    >
      <div class="card-body">
        <h2 class="card-title">{props.title}</h2>
        <p class="text-left">{props.description}</p>
      </div>
    </button>
  );
}

export default function Presets() {
  return (
    <div class="w-full px-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <Preset
        title="Plain Vike"
        description="For trying out Vike, or manually assembling your stack"
        features={["framework"]}
      />
      <Preset
        title="Frontend only"
        description="If a backend isn't needed, or a backend already exists"
        features={["framework", "uikit"]}
      />
      <Preset
        title="Full-stack"
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
