import { Suspense } from "react";
import ImageSlider from "./components/ImageSlider";
import Comments from "./components/Comments";

export default function Home() {
  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between border-b border-gray-800 bg-gray-900 px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white">
            My Gallery
          </h1>
          <p className="mt-0.5 text-xs text-gray-400">
            Browse through the collection
          </p>
        </div>
      </header>

      {/* ── Slider – constrained to 80 vh ──────────────────────────── */}
      <main className="h-[80vh] w-full bg-black">
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
      <footer className="border-t border-gray-800 bg-gray-900 px-6 py-6">
        <Comments />
      </footer>
    </>
  );
}
