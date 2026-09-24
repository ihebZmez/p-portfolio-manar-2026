// lib/seo.ts
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";

type Language = "en" | "fr" | "ar";

interface SeoConfig {
  siteName: string;
  siteUrl: string;
  description: string;
  keywords: string[];
  author: string;
  locale: Record<Language, string>;
  openGraph: {
    type: string;
    locale: Record<Language, string>;
    url: string;
    siteName: string;
  };
  twitter: {
    cardType: string;
  };
}

export const seoConfig: SeoConfig = {
  siteName: "Manar Zmerli",
  siteUrl: "https://portfolio-manar-zmerli.vercel.app",
  description:
    "Data analyst based in Tunisia, specialized in data analysis, visualization, and business intelligence.",
  keywords: [
    "data analyst",
    "Tunisia",
    "Power BI",
    "Python",
    "SQL",
    "data visualization",
    "business intelligence",
  ],
  author: "Manar Zmerli",
  locale: {
    en: "en_US",
    fr: "fr_FR",
    ar: "ar_TN",
  },
  openGraph: {
    type: "website",
    locale: {
      en: "en_US",
      fr: "fr_FR",
      ar: "ar_TN",
    },
    url: "https://portfolio-manar-zmerli.vercel.app",
    siteName: "Manar Zmerli",
  },
  twitter: {
    cardType: "summary_large_image",
  },
};

interface PageMetadataParams {
  lang: Language;
  t?: any;
}

export const getPageMetadata = ({ lang, t }: PageMetadataParams) => {
  const translations = lang === "en" ? en : fr;

  return {
    home: {
      title: translations.meta.title,
      description: translations.meta.description,
      keywords: translations.meta.keywords,
    },
    about: {
      title: `${translations.nav.about} | ${seoConfig.siteName}`,
      description: `${translations.about.tile1Title} ${translations.about.tile1Description}`,
      keywords: seoConfig.keywords.join(", "),
    },
    services: {
      title: `${translations.services.sectionTitle} | ${seoConfig.siteName}`,
      description: translations.services.sectionDescription,
      keywords: seoConfig.keywords.join(", "),
    },
    projects: {
      title: `${translations.activities.title} | ${seoConfig.siteName}`,
      description: `${translations.activities.title} - ${translations.hero.description}`,
      keywords: seoConfig.keywords.join(", "),
    },
    skills: {
      title: `${translations.expertise.title} | ${seoConfig.siteName}`,
      description: `${translations.expertise.title} - Python, SQL, Power BI, Tableau`,
      keywords: seoConfig.keywords.join(", "),
    },
    contact: {
      title: `${translations.nav.contact} | ${seoConfig.siteName}`,
      description: `Contact ${seoConfig.siteName} in Tunisia. Phone: ${translations.meta.whatsappPhone}`,
      keywords: seoConfig.keywords.join(", "),
    },
  };
};

// Helper to get metadata for current language
export const getMetadataForPage = (
  page: keyof ReturnType<typeof getPageMetadata>,
  lang: Language,
  t: any,
) => {
  const metadata = getPageMetadata({ lang, t })[page];
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `${seoConfig.siteUrl}/${lang}`,
      siteName: seoConfig.openGraph.siteName,
      locale: seoConfig.openGraph.locale[lang],
      type: seoConfig.openGraph.type,
    },
    twitter: {
      card: seoConfig.twitter.cardType,
      title: metadata.title,
      description: metadata.description,
    },
    alternates: {
      canonical: `${seoConfig.siteUrl}/${lang}`,
      languages: {
        en: `${seoConfig.siteUrl}/en`,
        fr: `${seoConfig.siteUrl}/fr`,
        ar: `${seoConfig.siteUrl}/ar`,
      },
    },
  };
};
