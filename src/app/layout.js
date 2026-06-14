import { JetBrains_Mono, Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700", "800"],
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
  title: "Ad Growly - Local Growth Systems",
  description:
    "Websites, local SEO, paid ads, automations, and conversion tracking for local service businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${syne.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body>{children}</body>
    </html>
  );
}
