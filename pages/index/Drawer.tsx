import type { JSX } from "solid-js";

export default function Drawer(props: {
  children: JSX.Element;
  drawer: JSX.Element;
}) {
  return (
    <div class="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col items-center justify-start">
        {props.children}
        <label
          for="my-drawer-2"
          class="btn btn-primary drawer-button lg:hidden"
        >
          Add elements
        </label>
      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" class="drawer-overlay"></label>
        {props.drawer}
      </div>
    </div>
  );
}
