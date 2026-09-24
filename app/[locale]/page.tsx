"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Skills from "@/components/Skills";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import GridServices from "@/components/GridServices";
import { buildNavItems } from "@/data";
import siteConfig from "@/configs/base-config.exemple.json";

const Grid = dynamic(() => import("@/components/Grid"), {
  ssr: false,
});

const RecentProjects = dynamic(() => import("@/components/RecentProjects"), {
  ssr: false,
});

const FloatingNav = dynamic(
  () => import("@/components/ui/FloatingNavbar").then((mod) => mod.FloatingNav),
  {
    ssr: false,
  },
);

const WhatsAppButton = dynamic(
  () =>
    import("@/components/ui/WhatsAppButton").then((mod) => mod.WhatsAppButton),
  {
    ssr: false,
  },
);

const Home = () => {
  const tMeta = useTranslations("meta");
  const tNav = useTranslations("nav");
  const navItems = buildNavItems(tNav);

  const features = siteConfig.features || {};

  return (
    <>
      <main className="relative mx-auto flex flex-col items-center justify-center overflow-hidden bg-background px-5 sm:px-10">
        <div className="layout-shell">
          {features.showNavbar !== false && <FloatingNav navItems={navItems} />}
          {features.showHero !== false && <Hero />}
          {features.showGridServices !== false && (
            <div className="section-shell-muted">
              <GridServices />
            </div>
          )}
          {features.showGrid !== false && (
            <div className="section-shell">
              <Grid />
            </div>
          )}
          {features.showRecentProjects !== false && (
            <div className="section-shell-muted">
              <RecentProjects />
            </div>
          )}
          {features.showClients !== false && (
            <div className="section-shell">
              <Clients />
            </div>
          )}
          {features.showSkills !== false && (
            <div className="section-shell-muted">
              <Skills />
            </div>
          )}
          {features.showExperience !== false && (
            <div className="section-shell">
              <Experience />
            </div>
          )}
          {features.showApproach !== false && (
            <div className="section-shell-muted">
              <Approach />
            </div>
          )}
          {features.showFooter !== false && (
            <div className="section-shell">
              <Footer />
            </div>
          )}
        </div>
        {features.showWhatsapp !== false && (
          <WhatsAppButton
            phoneNumber={tMeta("whatsappPhone")}
            message={tMeta("whatsapp")}
          />
        )}
      </main>
    </>
  );
};

export default Home;
