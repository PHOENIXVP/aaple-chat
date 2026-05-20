import "./globals.css";

import type { Metadata } from "next";

import { defaultMetadata } from "@/seo/metadata";
import Providers from "./providers";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
