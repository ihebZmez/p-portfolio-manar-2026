import type { MetadataRoute } from "next";

const siteUrl = "https://portfolio-manar-zmerli.vercel.app";
const locales = ["fr", "en", "ar"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === "en" ? 1 : 0.9,
    alternates: {
      languages: {
        en: `${siteUrl}/en`,
        fr: `${siteUrl}/fr`,
        ar: `${siteUrl}/ar`,
      },
    },
  }));
}
