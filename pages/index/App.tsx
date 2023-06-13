import { Logo } from "components/Logo";
import { Widget } from "components/Widget";

export default function App() {
  return (
    <div class="container mt-8">
      <div class="w-full items-center flex justify-center gap-8">
        <a class="inline-block" href="/">
          <Logo size={96} />
        </a>
        <h1 class="font-sans font-bold text-8xl pb-4">Bâti</h1>
      </div>
      <div class="w-full items-center flex justify-center mt-8">
        <Widget widget={false} />
      </div>
    </div>
  );
}
