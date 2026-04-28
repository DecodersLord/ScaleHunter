import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { HunterProvider } from "./context/HunterProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scale Hunter",
  description: "The Digital Monarch Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body
        className={`${inter.className} h-screen w-full min-h-full flex flex-col font-sans bg-surface text-foreground`}
        suppressHydrationWarning
      >
        <HunterProvider>{children}</HunterProvider>
      </body>
    </html>
  );
}
