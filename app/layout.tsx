import type { Metadata } from "next";
import { Bai_Jamjuree, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PublicLayoutWrapper from "@/components/PublicLayoutWrapper";

const baiJamjuree = Bai_Jamjuree({
  variable: "--font-bai-jamjuree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Tyreman24",
    default: "Tyreman24 | Expert Tire & Wheel Services",
  },
  description: "Tyreman24 is a premier tire shop in London offering expert tire change, wheel alignment, and maintenance services.",
  keywords: ["Tire Shop London", "Tire Change", "Wheel Alignment", "Puncture Repair", "Car Maintenance"],
  category: "Automotive",
  metadataBase: new URL("https://tyreman24.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tyreman24 | Premium Tire Services",
    description: "Expert tire shop providing all types of premium wheel alignment and tire services in London.",
    url: "https://tyreman24.vercel.app",
    siteName: "Tyreman24",
    locale: "en_GB",
    type: "website",
    images: [{
      url: "/logo/abdur-rehman-auto-garage.png",
      width: 800,
      height: 600,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tyreman24 | Expert Car Services",
    description: "High-end automobile maintenance and repair services for luxury and daily precision vehicles.",
    images: ["/logo/abdur-rehman-auto-garage.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo/abdur-rehman-auto-garage.png",
    shortcut: "/logo/abdur-rehman-auto-garage.png",
    apple: "/logo/abdur-rehman-auto-garage.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${baiJamjuree.variable} ${montserrat.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body
        className="min-h-full flex flex-col bg-[#110E10] text-[#DEDEDE]"
        suppressHydrationWarning
      >
        <PublicLayoutWrapper><Navbar /></PublicLayoutWrapper>
        {children}
        <PublicLayoutWrapper><Footer /></PublicLayoutWrapper>

        {/* Global Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TireShop",
              "name": "Tyreman24",
              "image": "https://tyreman24.vercel.app/logo/abdur-rehman-auto-garage.png",
              "@id": "https://tyreman24.vercel.app",
              "url": "https://tyreman24.vercel.app",
              "telephone": "+447728738148",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "14 Brick Ln",
                "addressLocality": "London",
                "addressRegion": "London",
                "postalCode": "E1 6RF",
                "addressCountry": "UK"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 51.5186,
                "longitude": -0.0717
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "08:00",
                "closes": "20:00"
              },
              "sameAs": [
                "https://www.facebook.com/careplusauto",
                "https://twitter.com/careplusauto",
                "https://www.instagram.com/careplusauto",
                "https://www.linkedin.com/company/careplusauto"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
