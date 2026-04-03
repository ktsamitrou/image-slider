"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { images, SliderImage } from "../data/images";
import Lightbox from "./Lightbox";

// Number of images to preload before and after the current index.
const PRELOAD_RANGE = 2;

function preloadIndices(current: number, total: number): Set<number> {
  const indices = new Set<number>();
  for (let offset = -PRELOAD_RANGE; offset <= PRELOAD_RANGE; offset++) {
    const idx = (current + offset + total) % total;
    indices.add(idx);
  }
  return indices;
}

function indexFromId(id: number | null): number {
  if (id === null) return 0;
  const found = images.findIndex((img) => img.id === id);
  return found >= 0 ? found : 0;
}

export default function ImageSlider() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialIndex = useMemo(() => {
    const idParam = searchParams.get("id");
    return indexFromId(idParam ? Number(idParam) : null);
  }, [searchParams]);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const total = images.length;
  const currentImage: SliderImage = images[currentIndex];

  // Sync URL when currentIndex changes.
  const navigateTo = useCallback(
    (index: number) => {
      const next = (index + total) % total;
      setCurrentIndex(next);
      const params = new URLSearchParams(searchParams.toString());
      params.set("id", String(images[next].id));
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, total],
  );

  const goPrev = useCallback(
    () => navigateTo(currentIndex - 1),
    [currentIndex, navigateTo],
  );
  const goNext = useCallback(
    () => navigateTo(currentIndex + 1),
    [currentIndex, navigateTo],
  );

  // Keyboard navigation.
  useEffect(() => {
    if (lightboxOpen) return; // Lightbox handles its own keys.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, goPrev, goNext]);

  const toPreload = preloadIndices(currentIndex, total);

  return (
    <>
      {/* Slider container */}
      <div className="relative flex h-full w-full select-none flex-col items-center justify-center overflow-hidden bg-black">
        {/* Click zones – left half goes prev, right half goes next */}
        <button
          className="absolute left-0 top-0 z-10 h-full w-1/2 cursor-w-resize focus:outline-none"
          onClick={goPrev}
          aria-label="Previous image"
          tabIndex={-1}
        />
        <button
          className="absolute right-0 top-0 z-10 h-full w-1/2 cursor-e-resize focus:outline-none"
          onClick={goNext}
          aria-label="Next image"
          tabIndex={-1}
        />

        {/* Chevron buttons (visible on hover / always on mobile) */}
        <button
          className="group absolute left-3 z-20 rounded-full bg-black/30 p-2 text-white shadow-md transition hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white sm:left-5 sm:p-3"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 sm:h-8 sm:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Current image */}
        <div className="relative h-full w-full">
          <Image
            key={currentImage.id}
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Preload adjacent images (hidden) */}
        {Array.from(toPreload)
          .filter((i) => i !== currentIndex)
          .map((i) => (
            <Image
              key={images[i].id}
              src={images[i].src}
              alt=""
              fill
              sizes="1px"
              className="invisible absolute"
              aria-hidden="true"
            />
          ))}

        {/* Right chevron */}
        <button
          className="absolute right-3 z-20 rounded-full bg-black/30 p-2 text-white shadow-md transition hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white sm:right-5 sm:p-3"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 sm:h-8 sm:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Expand to full-screen button */}
        <button
          className="absolute bottom-4 right-4 z-30 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
          onClick={(e) => {
            e.stopPropagation();
            setLightboxOpen(true);
          }}
          aria-label="View full image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </button>

        {/* Image counter */}
        <div className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-sm text-white">
          {currentIndex + 1} / {total}
        </div>

        {/* Caption */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/70 to-transparent pb-10 pt-6 text-center text-sm text-white sm:text-base">
          {currentImage.alt}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          image={currentImage}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => {
            goPrev();
          }}
          onNext={() => {
            goNext();
          }}
        />
      )}
    </>
  );
}
