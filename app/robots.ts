import type { MetadataRoute } from "next";

const siteUrl = "https://portfolio-manar-zmerli.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/fr", "/en", "/ar"],
        disallow: ["/admin/", "/private/", "/api/", "/_next/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
