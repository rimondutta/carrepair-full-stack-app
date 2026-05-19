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
    template: "%s | J's Auto Repair Shop LLC",
    default: "J's Auto Repair Shop LLC | MOT, Car Repair & Servicing",
  },
  description: "J's Auto Repair Shop LLC in Mountainside offers expert MOT testing, car servicing, repairs, and maintenance. Visit us at 900 Mountain Ave, Mountainside, NJ 07092.",
  keywords: ["MOT Mountainside", "Car Repair Mountainside", "Car Service Mountainside", "MOT Station Mountainside", "Auto Repair Mountainside", "Car Maintenance Mountainside", "J's Auto Repair Shop LLC"],
  category: "Automotive",
  metadataBase: new URL("https://samsautomotiverepairs.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "J's Auto Repair Shop LLC | MOT & Car Repair",
    description: "Expert MOT testing, car servicing and repairs in Mountainside. 900 Mountain Ave, Mountainside, NJ 07092.",
    url: "https://samsautomotiverepairs.com",
    siteName: "J's Auto Repair Shop LLC",
    locale: "en_GB",
    type: "website",
    images: [{
      url: "/logo/Auto-Repair-Website-logo.png",
      width: 800,
      height: 600,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "J's Auto Repair Shop LLC | MOT & Car Repair Mountainside",
    description: "Expert MOT testing, car servicing and repairs in Mountainside, United Kingdom.",
    images: ["/logo/Auto-Repair-Website-logo.png"],
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
    icon: "/logo/Auto-Repair-Website-logo.png",
    shortcut: "/logo/Auto-Repair-Website-logo.png",
    apple: "/logo/Auto-Repair-Website-logo.png",
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
              "name": "J's Auto Repair Shop LLC",
              "image": "https://samsautomotiverepairs.com/logo/Auto-Repair-Website-logo.png",
              "@id": "https://samsautomotiverepairs.com",
              "url": "https://samsautomotiverepairs.com",
              "telephone": "+1 (862) 279-8403",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "900 Mountain Ave",
                "addressLocality": "Mountainside",
                "addressRegion": "NJ",
                "postalCode": "07092",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 40.6773,
                "longitude": -74.3468
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
