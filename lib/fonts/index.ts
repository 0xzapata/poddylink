import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const fontHeading = localFont({
  src: "./CalSans-SemiBold.woff2",
  variable: "--font-cal-sans",
  weight: "100 900",
});

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "variable",
});

export const fontMono = localFont({
  src: "./GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
