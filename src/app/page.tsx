import { Suspense } from "react";
import ImageSlider from "./components/ImageSlider";
import Comments from "./components/Comments";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-8">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="mb-4 border-b border-gray-800 pb-4">
        <h1 className="text-xl font-semibold tracking-tight text-white">
          My Gallery
        </h1>
        <p className="mt-0.5 text-xs text-gray-400">
          Browse through the collection
        </p>
      </header>

      {/* ── Slider – 80 vh, capped at container width ──────────────── */}
      <main className="h-[80vh] w-full overflow-hidden rounded-lg bg-black">
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center text-white">
              Loading…
            </div>
          }
        >
          <ImageSlider />
        </Suspense>
      </main>

      {/* ── Footer / Comments ──────────────────────────────────────── */}
      <footer className="mt-8 border-t border-gray-800 pt-6">
        <Comments />
      </footer>
    </div>
  );
}
