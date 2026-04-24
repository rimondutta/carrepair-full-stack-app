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
    template: "%s | ARJUN CAR MOT STATION",
    default: "ARJUN CAR MOT STATION Wembley | MOT, Car Repair & Servicing",
  },
  description: "ARJUN CAR MOT STATION in Wembley offers expert MOT testing, car servicing, repairs, and maintenance. Visit us at UNIT 29, Abbey Industrial Estate, Wembley HA0 1ZD.",
  keywords: ["MOT Wembley", "Car Repair Wembley", "Car Service Wembley", "MOT Station Wembley", "Auto Repair Wembley", "Car Maintenance Wembley", "Arjun Car MOT"],
  category: "Automotive",
  metadataBase: new URL("https://arjuncarmotwembley.co.uk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ARJUN CAR MOT STATION Wembley | MOT & Car Repair",
    description: "Expert MOT testing, car servicing and repairs in Wembley. UNIT 29, Abbey Industrial Estate, Wembley HA0 1ZD.",
    url: "https://arjuncarmotwembley.co.uk",
    siteName: "ARJUN CAR MOT STATION",
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
    title: "ARJUN CAR MOT STATION | MOT & Car Repair Wembley",
    description: "Expert MOT testing, car servicing and repairs in Wembley, United Kingdom.",
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
              "name": "ARJUN CAR MOT STATION",
              "image": "https://arjuncarmotwembley.co.uk/logo/Auto-Repair-Website-logo.png",
              "@id": "https://arjuncarmotwembley.co.uk",
              "url": "https://arjuncarmotwembley.co.uk",
              "telephone": "+447440164792",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "UNIT 29, ABBEY INDUSTRIAL ESTATE, Woodside End, Mount Pleasant",
                "addressLocality": "Wembley",
                "addressRegion": "Greater London",
                "postalCode": "HA0 1ZD",
                "addressCountry": "GB"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 51.5474,
                "longitude": -0.3046
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
