import { FloatingContactBar } from "@/components/layout/FloatingContactBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { LoadingScreen } from "@/components/motion/LoadingScreen";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ContactSection } from "@/components/sections/ContactSection";
import { EstimatorSection } from "@/components/sections/EstimatorSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TrustBarSection } from "@/components/sections/TrustBarSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";

export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <LoadingScreen />
      <CustomCursor />
      <Header />
      <main>
        <HeroSection />
        <TrustBarSection />
        <ServicesSection />
        <ProcessSection />
        <EstimatorSection />
        <ProjectsSection />
        <WhyUsSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingContactBar />
    </>
  );
}
