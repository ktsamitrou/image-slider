import { Suspense } from "react";
import ImageSlider from "./components/ImageSlider";

export default function Home() {
  return (
    <main className="flex flex-1 h-full flex-col bg-black">
      <Suspense fallback={<div className="flex h-full items-center justify-center text-white">Loading…</div>}>
        <ImageSlider />
      </Suspense>
    </main>
  );
}
