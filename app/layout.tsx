import type { Metadata } from "next";

import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "SA Chefs Association - Board of Directors Voting",
  description:
    "Vote for your preferred candidates in the SA Chefs Association Board of Directors election.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
