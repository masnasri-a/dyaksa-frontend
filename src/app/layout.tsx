import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald, Yellowtail } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const yellowtail = Yellowtail({
  weight: "400",
  variable: "--font-yellowtail",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dyaksa Photography",
  description: "Capture your moment with us",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} ${yellowtail.variable} font-oswald antialiased`}
      >
        {children}
      </body>
    </html>
  );
}


