import { HeroSection } from "@/components/home/hero-section";
import { FeaturedServices } from "@/components/home/featured-services";
import { HowItWorks } from "@/components/home/how-it-works";
import { PopularCategories } from "@/components/home/popular-categories";
import { WhyChooseUs } from "@/components/home/why-choose-us";

export default function HomePage() {
  return (
    <div className="flex flex-col">

      <HeroSection />

      <FeaturedServices />

      <HowItWorks />

      <PopularCategories />

      <WhyChooseUs />
    </div>
  );
}
