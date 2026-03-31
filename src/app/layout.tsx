import type { Metadata } from "next";
import "../styles/global.css"
import { ApolloWrapper } from "@/lib/apollo-wrapper";

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
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}