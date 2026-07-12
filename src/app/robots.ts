import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/*/admin",
          "/api/",
          "/cart",
          "/*/cart",
          "/account",
          "/*/account",
          "/wishlist",
          "/*/wishlist",
          "/order-confirmation",
          "/*/order-confirmation",
          "/catalog/print",
          "/*/catalog/print",
        ],
      },
    ],
    sitemap: `${siteOrigin}/sitemap.xml`,
    host: siteOrigin,
  };
}
