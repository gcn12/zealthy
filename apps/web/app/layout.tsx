import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TanstackQueryClientProvider } from "@/components/TanstackQueryProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Zealthy Help Desk",
  description: "Help Desk App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TanstackQueryClientProvider>
        <body className={inter.className}>{children}</body>
      </TanstackQueryClientProvider>
    </html>
  );
}
