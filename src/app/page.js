import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactsSection from "@/components/ContactsSection";


export default function Home() {
  return (
    <main className="bg-[#050507] text-white">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ReviewsSection />
      <ContactsSection />
    </main>
  );
}