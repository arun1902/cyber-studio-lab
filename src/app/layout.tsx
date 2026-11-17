import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Grain } from "@/components/animations/grain";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/navigation/navbar";
import { ThemeProvider, themeInitScript } from "@/components/theme/theme-provider";
import { site } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Cyber Studio Lab — A Safer Digital Mindset",
    template: "%s — Cyber Studio Lab",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "cybersecurity",
    "security awareness",
    "privacy",
    "tutorials",
    "Cyber Studio Lab",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "Cyber Studio Lab — A Safer Digital Mindset",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyber Studio Lab",
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f2ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d10" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
  };

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-ink font-sans text-paper antialiased">
        <ThemeProvider>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          <a className="skip-link" href="#content">
            Skip to content
          </a>
          <Grain />
          <Navbar />
          <main id="content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
