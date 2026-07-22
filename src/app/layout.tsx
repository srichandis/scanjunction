import type { Metadata } from "next";
import Script from "next/script";
import "../index.css";

export const metadata: Metadata = {
  title: "ScanJunction Home",
  description:
    "A premium, fully responsive home page for ScanJunction with live WordPress blog integration.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
          <Script
      src="https://www.googletagmanager.com/gtag/js?id=G-ECT9ECZ2XY"
      strategy="afterInteractive"
    />

    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-ECT9ECZ2XY');
      `}
    </Script>
    </html>
  );
}
