import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from 'next/script'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pomodoro Timer | Boost Your Productivity",
  description: "Enhance your focus and productivity with our Pomodoro Timer. Manage your time effectively using the popular Pomodoro Technique.",
  keywords: [
    "Pomodoro timer, time management tool, productivity app",
    "focus timer, work-break cycle, study timer",
    "25-minute timer, task management, concentration booster",
    "time blocking technique, work efficiency tool, distraction-free timer",
    "productivity technique, time tracking app, work-life balance tool",
    "pomodoro technique, pomodoro clock",
  ].join(", "),
  openGraph: {
    title: "Pomodoro Timer - Maximize Your Productivity",
    description: "Boost your focus and efficiency with our Pomodoro Timer. Use time-tested techniques to enhance your work and study sessions.",
    images: [
      {
        url: "https://pomodoro.ludgi.ai/logo.webp",
        width: 1200,
        height: 630,
        alt: "Pomodoro Timer Tool",
      },
    ],
    locale: "en_US",
    type: "website",
    siteName: "Pomodoro Timer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pomodoro Timer - Enhance Your Focus and Productivity",
    description: "Improve your time management skills with our Pomodoro Timer. Boost productivity and maintain a healthy work-life balance.",
    images: ["https://pomodoro-timer.example.com/logo.webp"],
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
};

const pubId = "ca-pub-5823741955283998"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content={pubId} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Funding Choices 스크립트 */}
        <Script
          id="google-funding-choices"
          strategy="afterInteractive"
          src={`https://fundingchoicesmessages.google.com/i/${pubId}?ers=1`}
        />
        {/* Google FC Present 스크립트 */}
        <Script
          id="google-fc-present"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})();`
          }}
        />
      </body>
    </html>
  );
}
