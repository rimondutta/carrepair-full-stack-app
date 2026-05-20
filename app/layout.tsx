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
    template: "%s | Sam's Automotive Repair",
    default: "Sam's Automotive Repair | MOT, Car Repair & Servicing",
  },
  description: "Sam's Automotive Repair in North Bergen offers expert MOT testing, car servicing, repairs, and maintenance. Visit us at 4410 Dell Ave, North Bergen, NJ 07047.",
  keywords: ["MOT North Bergen", "Car Repair North Bergen", "Car Service North Bergen", "MOT Station North Bergen", "Auto Repair North Bergen", "Car Maintenance North Bergen", "Sam's Automotive Repair"],
  category: "Automotive",
  metadataBase: new URL("https://samsautomotiverepairs.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sam's Automotive Repair | MOT & Car Repair",
    description: "Expert MOT testing, car servicing and repairs in North Bergen. 4410 Dell Ave, North Bergen, NJ 07047.",
    url: "https://samsautomotiverepairs.com",
    siteName: "Sam's Automotive Repair",
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
    title: "Sam's Automotive Repair | MOT & Car Repair North Bergen",
    description: "Expert MOT testing, car servicing and repairs in North Bergen, United States.",
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
              "name": "Sam's Automotive Repair",
              "image": "https://samsautomotiverepairs.com/logo/Auto-Repair-Website-logo.png",
              "@id": "https://samsautomotiverepairs.com",
              "url": "https://samsautomotiverepairs.com",
              "telephone": "+1 (973) 868-4091",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "4410 Dell Ave",
                "addressLocality": "North Bergen",
                "addressRegion": "NJ",
                "postalCode": "07047",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 40.7847,
                "longitude": -74.0355
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
