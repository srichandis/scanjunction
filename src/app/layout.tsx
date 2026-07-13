import type { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
  title: "ScanJunction Home",
  description:
    "A premium, fully responsive home page for ScanJunction with live WordPress blog integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
