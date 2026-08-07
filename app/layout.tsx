import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Navbar from "../components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ERNReal - Minimalist Real Estate",
  description: "Find your perfect home with our functional minimalist platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground antialiased`}>
        <StoreProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
