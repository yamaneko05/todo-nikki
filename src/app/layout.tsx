import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo日記",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`bg-slate-50 ${notoSansJp.className}`}>
        <div className="mx-auto min-h-screen max-w-[400px] bg-white">
          {children}
        </div>
      </body>
    </html>
  );
}
