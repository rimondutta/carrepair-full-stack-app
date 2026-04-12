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
    template: "%s | Abdur Rehman Auto Garage",
    default: "Abdur Rehman Auto Garage | Expert Car Repair & Maintenance",
  },
  description: "Abdur Rehman Auto AC Electrical & Mechanical Repairing Garage is a premier automobile maintenance workshop in Dubai offering expert car repair, engine tuning, etc.",
  keywords: ["Car Repair Dubai", "Auto Repairing", "Engine Tuning", "Dent Removal", "Ceramic Coating", "Car Maintenance"],
  category: "Automotive",
  metadataBase: new URL("https://careplusauto.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Abdur Rehman Auto Garage | Premium Car Maintenance",
    description: "Expert automobile maintenance workshop providing all types of premium car repair and restoration services in Dubai.",
    url: "https://careplusauto.vercel.app",
    siteName: "Abdur Rehman Auto Garage",
    locale: "en_US",
    type: "website",
    images: [{
      url: "/logo/abdur-rehman-auto-garage.png",
      width: 800,
      height: 600,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdur Rehman Auto Garage | Expert Car Services",
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
              "@type": "AutoRepair",
              "name": "Abdur Rehman Auto AC Electrical & Mechanical Repairing Garage",
              "image": "https://careplusauto.vercel.app/logo/abdur-rehman-auto-garage.png",
              "@id": "https://careplusauto.vercel.app",
              "url": "https://careplusauto.vercel.app",
              "telephone": "+971567253107",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "24B Street - Al Qouz Ind.first - Al Quoz",
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
