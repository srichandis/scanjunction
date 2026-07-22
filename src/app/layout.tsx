import type { Metadata } from "next";
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
      <head>
        <!-- Google tag (gtag.js) -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-ECT9ECZ2XY"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-ECT9ECZ2XY');
          </script>
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
