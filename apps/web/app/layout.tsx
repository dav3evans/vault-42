import type { Metadata } from "next";
import Image from "next/image";
import { Bebas_Neue, Barlow, Barlow_Condensed, Share_Tech_Mono } from "next/font/google";
import { Header, Footer, StickyMobileBar } from "@vault42/ui";
import { primaryNav, footerColumns, bookingHref, socialLinks } from "@/lib/site-nav";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const barlow = Barlow({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Vault 42 | Axe Throwing in Nuneaton",
    template: "%s | Vault 42",
  },
  description:
    "Step into Vault 42 in Nuneaton for augmented axe throwing inside a reclaimed HEX Corp world. Hexforce Laser Tag and Hexcape escape rooms are sector locked, coming soon.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${barlow.variable} ${barlowCondensed.variable} ${shareTechMono.variable}`}
    >
      <body className="bg-bg font-sans text-text">
        <Header
          brandTitle="VAULT 42"
          brandSubtitle="A Division of Hex Corp"
          links={primaryNav}
          bookHref={bookingHref}
          logo={<Image src="/brand/logo.webp" alt="Vault 42 logo" fill sizes="56px" className="object-contain" priority />}
        />
        {children}
        <Footer
          eyebrow="Vault 42"
          blurb="Vault 42 is live with augmented axe throwing inside a reclaimed post-apocalyptic HEX Corp world. Hexforce Laser Tag and Hexcape escape rooms are sector locked — coming soon."
          columns={footerColumns}
          social={socialLinks}
          copyright="Vault 42® is a registered trade mark of Hex Box Limited"
        />
        <StickyMobileBar primary={{ label: "Book Now", href: bookingHref }} secondary={{ label: "See Pricing", href: "/axe-throwing#pricing" }} />
      </body>
    </html>
  );
}
