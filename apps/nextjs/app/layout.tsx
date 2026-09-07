import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build & Code",
  description: "Autonomous AI software engineering workspace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
