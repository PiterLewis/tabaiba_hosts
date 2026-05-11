import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { HowItWorks } from "@/components/HowItWorks";
import { Services } from "@/components/Services";
import { Pricing } from "@/components/Pricing";
import { WhyUs } from "@/components/WhyUs";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <Services />
        <Pricing />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
