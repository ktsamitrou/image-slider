import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Image Slider",
  description: "A responsive image slider with bookmark-friendly URLs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex h-full flex-col">{children}</body>
    </html>
  );
}
