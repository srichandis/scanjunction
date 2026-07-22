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
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
