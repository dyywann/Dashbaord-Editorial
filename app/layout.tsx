import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"; // <-- 1. Import Toaster

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
        <Toaster /> {/* <-- 2. Taruh di sini, di bawah children */}
      </body>
    </html>
  );
}
