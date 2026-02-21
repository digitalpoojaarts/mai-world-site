import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const helveticaNow = localFont({
  src: [
    {
      path: "../../public/fonts/HelveticaNowDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNowDisplay-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-helvetica-now",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAI World | Handover Cleaning Specialists",
  description:
    "Manpower Alliance of India (MAI) handover cleaning and housekeeping services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${helveticaNow.variable} antialiased`}>{children}</body>
    </html>
  );
}
