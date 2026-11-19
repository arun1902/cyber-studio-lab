import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { Grain } from "@/components/animations/grain";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/navigation/navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { site } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "software development",
    "cybersecurity",
    "application security",
    "devops",
    "devsecops",
    "cloud security",
    "docker",
    "kubernetes",
    "tutorials",
    site.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9fc" },
    { media: "(prefers-color-scheme: dark)", color: "#1e1b4b" },
  ],
  colorScheme: "light dark",
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
    <html lang="en" className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${jetbrains.variable} light h-full`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-ink font-sans text-paper antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
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
