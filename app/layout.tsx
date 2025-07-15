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
        <Toaster
          position="top-center"
          expand={false}
          richColors={true}
          closeButton={true}
          offset={0}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10000,
          }}
        />
      </body>
    </html>
  );
}
