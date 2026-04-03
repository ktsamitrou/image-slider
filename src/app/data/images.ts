export interface SliderImage {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Sample images stored locally under /public/images.
// Varying aspect ratios to demonstrate responsive handling.
export const images: SliderImage[] = [
  { id: 1, src: "/images/image-1.svg", alt: "Forest Path", width: 1600, height: 900 },
  { id: 2, src: "/images/image-2.svg", alt: "Autumn Leaves", width: 900, height: 1200 },
  { id: 3, src: "/images/image-3.svg", alt: "Mountain Lake", width: 1200, height: 800 },
  { id: 4, src: "/images/image-4.svg", alt: "City Street", width: 800, height: 1200 },
  { id: 5, src: "/images/image-5.svg", alt: "Snowy Mountains", width: 1600, height: 1067 },
  { id: 6, src: "/images/image-6.svg", alt: "Beach Sunset", width: 1600, height: 1067 },
  { id: 7, src: "/images/image-7.svg", alt: "Desert Dunes", width: 1067, height: 1600 },
  { id: 8, src: "/images/image-8.svg", alt: "Waterfall", width: 1600, height: 1067 },
  { id: 9, src: "/images/image-9.svg", alt: "City Skyline", width: 1600, height: 1067 },
  { id: 10, src: "/images/image-10.svg", alt: "Green Hills", width: 1600, height: 1067 },
];
