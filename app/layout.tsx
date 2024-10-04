import { fontHeading, fontMono, fontSans } from "@/lib/fonts/index";
import clsx from "clsx";
import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'

import "./globals.css";

export const metadata: Metadata = {
  title: "Poddylink",
  description: "Chartable alternative for smartlinks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={clsx(
          fontHeading.variable,
          fontSans.variable,
          fontMono.variable,
          "font-sans antialiased",
        )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
