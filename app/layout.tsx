import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from 'next/link'

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
				<nav className="bg-gray-100 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">Poddylink</Link>
            <Link href="/smartlink/new" className="text-blue-500 hover:underline">Create Smartlink</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
