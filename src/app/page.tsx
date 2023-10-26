import HorizontalScrollCarousel from "./component/HorizontalScrollCarousel";
import { IsClientCtxProvider } from "./component/IsClientCtx";

export default function Home() {
  return (
    <main className="">
      <div className="bg-neutral-800">
        <div className="flex h-48 items-center justify-center">
          <span className="font-semibold uppercase text-neutral-500">
            Scroll down
          </span>
        </div>
        <IsClientCtxProvider>
          <HorizontalScrollCarousel direction="left" />
          <HorizontalScrollCarousel direction="right" />
        </IsClientCtxProvider>
        <div className="flex h-48 items-center justify-center">
          <span className="font-semibold uppercase text-neutral-500">
            Scroll up
          </span>
        </div>
      </div>
    </main>
  );
}
