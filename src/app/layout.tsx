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
    <html lang="en" className="antialiased">
      <body className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
        {children}
      </body>
    </html>
  );
}
