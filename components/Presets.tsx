import { children, type JSX, useContext } from "solid-js";
import { type Features, StoreContext } from "#components/Store";
import clsx from "clsx";

function Preset(props: {
  title: string;
  children: JSX.Element;
  features: Features[];
  class?: string;
  titleClass?: string;
  disabled?: boolean;
}) {
  const { selectPreset } = useContext(StoreContext);
  const c = children(() => props.children);

  return (
    <button
      type="button"
      class={clsx("card card-compact border-0 bg-base-100", props.class)}
      onclick={() => !props.disabled && selectPreset(props.features)}
      classList={{
        "cursor-default opacity-50": props.disabled,
      }}
    >
      <div class="card-body">
        <h2 class={clsx("card-title", props.titleClass)}>{props.title}</h2>
        <p class="text-left">{c()}</p>
      </div>
    </button>
  );
}

export default function Presets() {
  return (
    <div class="w-full px-4 box-border grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <Preset
        title="Plain Vike"
        class="hover:outline outline-amber-500/60 outline-2 outline-offset-2"
        titleClass="underline decoration-amber-500"
        features={["framework"]}
      >
        For trying out <span class="font-bold">Vike</span>, or{" "}
        <span class="font-bold">manually assembling</span> your stack
      </Preset>
      <Preset
        title="Frontend only"
        class="hover:outline outline-sky-500/60 outline-2 outline-offset-2"
        titleClass="underline decoration-sky-500"
        features={["framework", "uikit"]}
      >
        If a backend isn't needed, or a backend already exists
      </Preset>
      <Preset
        title="Full-stack"
        class="hover:outline outline-fuchsia-700/60 outline-2 outline-offset-2"
        titleClass="underline decoration-fuchsia-700"
        features={["framework", "rpc", "auth", "db", "uikit", "server"]}
      >
        Frontend + Server + Database
      </Preset>
      <Preset title="E-commerce" features={["framework"]} disabled={true}>
        E-commerce website powered by Shopify or BigCommerce.
      </Preset>
    </div>
  );
}
