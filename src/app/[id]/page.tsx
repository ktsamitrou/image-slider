import { notFound } from "next/navigation";
import { Suspense } from "react";
import Comments from "../components/Comments";
import ImageSlider from "../components/ImageSlider";
import { images } from "../data/images";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return images.map((img) => ({ id: String(img.id) }));
}

export default async function GalleryPage({ params }: Props) {
  const { id } = await params;
  const imageId = Number(id);
  const exists = images.some((img) => img.id === imageId);
  if (!exists) notFound();

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
          <ImageSlider initialId={imageId} />
        </Suspense>
      </main>

      {/* ── Footer / Comments ──────────────────────────────────────── */}
      <footer className="mt-8 border-t border-gray-800 pt-6">
        <Comments />
      </footer>
    </div>
  );
}
