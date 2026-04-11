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
    template: "%s | Care Plus Auto Repairing",
    default: "Care Plus Auto Repairing | Expert Car Repair & Maintenance",
  },
  description: "Care Plus Auto Repairing is the premier automobile maintenance workshop in Dubai offering expert car repair, engine tuning, and premium glass services. Trusted by 10k+ vehicle owners.",
  keywords: ["Car Repair Dubai", "Auto Repairing", "Engine Tuning", "Dent Removal", "Ceramic Coating", "Car Maintenance"],
  category: "Automotive",
  metadataBase: new URL("https://careplusauto.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Care Plus Auto Repairing | Premium Car Maintenance",
    description: "Expert automobile maintenance workshop providing all types of premium car repair and restoration services in Dubai.",
    url: "https://careplusauto.vercel.app",
    siteName: "Care Plus Auto Repairing",
    locale: "en_US",
    type: "website",
    images: [{
      url: "/logo/care-plus-logo.png",
      width: 800,
      height: 600,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Care Plus Auto Repairing | Expert Car Services",
    description: "High-end automobile maintenance and repair services for luxury and daily precision vehicles.",
    images: ["/logo/care-plus-logo.png"],
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
    icon: "/logo/care-plus-logo.png",
    shortcut: "/logo/care-plus-logo.png",
    apple: "/logo/care-plus-logo.png",
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
              "@type": "AutoRepair",
              "name": "Care Plus Auto Repairing",
              "image": "https://careplusauto.vercel.app/logo/care-plus-logo.png",
              "@id": "https://careplusauto.vercel.app",
              "url": "https://careplusauto.vercel.app",
              "telephone": "+971-XXXX-XXXX",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "9 19d Street - 3 St - Al Qouz Ind. 3",
                "addressLocality": "Dubai",
                "addressRegion": "Dubai",
                "addressCountry": "AE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 25.1384,
                "longitude": 55.2343
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
