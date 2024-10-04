import { SignIn } from "@clerk/nextjs";
import NextLink from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-gray-100 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <NextLink href="/" className="text-xl font-bold">Poddylink</NextLink>
        </div>
      </nav>
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6">Poddylink</h1>
          <p className="text-xl mb-8">Replacement for Chartable SmartLinks</p>
          <SignIn fallbackRedirectUrl="/dashboard" />
        </div>
      </main>
    </div>
  );
}