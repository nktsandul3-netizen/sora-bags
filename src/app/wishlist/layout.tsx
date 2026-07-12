import type { Metadata } from "next";
import { noIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...noIndexMetadata,
  title: "Избранное",
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
