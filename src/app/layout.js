import { Plus_Jakarta_Sans, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Ads Growly - Premium Local Acquisition Engines",
  description: "Billion-dollar growth engines for service brands. High-performance GMB optimization, Meta Ads, and Google Ads campaigns paired with a free custom-built website.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${syne.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        {/* Tabler Icons CSS */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#F4F7F6] text-[#111111] antialiased">
        {children}
      </body>
    </html>
  );
}

