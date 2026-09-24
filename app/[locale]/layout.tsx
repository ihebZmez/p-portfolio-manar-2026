import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import siteConfig from "@/configs/base-config.exemple.json";

import "../globals.css";
import { ThemeProvider } from "../provider";

const inter = Inter({ subsets: ["latin"] });
const productionUrl = "https://portfolio-manar-zmerli.vercel.app";
const supportedLocales = ["fr", "en", "ar"] as const;

const localeMap = {
  en: { openGraphLocale: "en_US", htmlLang: "en" },
  fr: { openGraphLocale: "fr_FR", htmlLang: "fr" },
  ar: { openGraphLocale: "ar_TN", htmlLang: "ar" },
} as const;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const safeLocale = supportedLocales.includes(
    locale as (typeof supportedLocales)[number],
  )
    ? (locale as (typeof supportedLocales)[number])
    : "fr";

  const t = await getTranslations({ locale: safeLocale, namespace: "meta" });
  const brandName = siteConfig.brand?.name || "Manar Zmerli";
  const websiteUrl = (siteConfig.contact as any)?.website || productionUrl;
  const canonicalUrl = `${websiteUrl}/${safeLocale}`;
  const alternateLanguages = Object.fromEntries(
    supportedLocales.map((code) => [code, `${websiteUrl}/${code}`]),
  ) as Record<string, string>;

  return {
    metadataBase: new URL(websiteUrl),
    applicationName: brandName,
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: brandName }],
    creator: brandName,
    publisher: brandName,
    viewport: "width=device-width, initial-scale=1",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: localeMap[safeLocale].openGraphLocale,
      alternateLocale: supportedLocales.map(
        (code) => localeMap[code].openGraphLocale,
      ),
      url: canonicalUrl,
      title: t("title"),
      description: t("description"),
      siteName: brandName,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const activeLocale = locale || siteConfig.i18n?.defaultLanguage || "en";
  const dir =
    siteConfig.i18n?.direction || (activeLocale === "ar" ? "rtl" : "ltr");
  const defaultTheme = siteConfig.theme?.darkMode ? "dark" : "light";
  return (
    <html lang={activeLocale} dir={dir} suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-MWGW2FL7BG"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MWGW2FL7BG');
          `}
        </Script>
        <meta
          name="google-site-verification"
          content="MjUjqo5MP1kfsYfRKhF6OTb1f6IOSi_RCgtX_Ls6GSU"
        />
        <link
          rel="icon"
          href={siteConfig.brand?.favicon || "/b4.svg"}
          sizes="any"
        />
      </head>
      <body
        className={
          siteConfig.theme?.font === "Inter" || !siteConfig.theme?.font
            ? inter.className
            : ""
        }
      >
        <NextIntlClientProvider locale={activeLocale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme={defaultTheme}
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
        {/* <Script id="tawkto-script" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/683efa04dbbab1190c33454e/1isr018bc';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script> */}
      </body>
    </html>
  );
}
