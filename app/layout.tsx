import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/Toaster";
import Provider from "@/lib/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tech Sister",
  description: "Empowering Women in Tech: Inspire, Innovate, Lead!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
