import type { Metadata } from "next";
import "@/styles/globals.css";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Stonebay — Nigeria's #1 Marketplace",
    template: "%s | Stonebay",
  },
  description:
    "Shop from thousands of verified sellers across fashion, electronics, home goods, beauty, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ApolloWrapper>
      </body>
    </html>
  );
}