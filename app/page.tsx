import BlobCursor from "@/components/BlobCursor";
import GrainOverlay from "@/components/GrainOverlay";
import IntroCurtain from "@/components/IntroCurtain";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import SmoothScroll from "@/components/SmoothScroll";
import ComoSeFaz from "@/components/sections/ComoSeFaz";
import Convite from "@/components/sections/Convite";
import Hero from "@/components/sections/Hero";
import Lotes from "@/components/sections/Lotes";
import Manifesto from "@/components/sections/Manifesto";
import OndeEncontrar from "@/components/sections/OndeEncontrar";
import Provas from "@/components/sections/Provas";

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <IntroCurtain />
      <BlobCursor />
      <GrainOverlay />

      <a
        href="#manifesto"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-intro focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
      >
        Saltar para o conteúdo
      </a>

      <SiteNav />

      <main>
        <Hero />
        <Manifesto />
        <Lotes />
        <ComoSeFaz />
        <Provas />
        <OndeEncontrar />
        <Convite />
      </main>

      <SiteFooter />
    </>
  );
}
