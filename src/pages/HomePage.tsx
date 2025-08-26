import BannerSection from "@/components/modules/home/BannerSection";
import CTASection from "@/components/modules/home/CTASection";
import OverviewSection from "@/components/modules/home/OverViewSection";
import PromotionsSection from "@/components/modules/home/PromotionalSection";
import ServicesSection from "@/components/modules/home/ServiceSection";
import TestimonialsSection from "@/components/modules/home/Testimonials";

const HomePage = () => {
  return (
    <div className="container mx-auto">
      <BannerSection />
      <OverviewSection />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
      <PromotionsSection />
    </div>
  );
};

export default HomePage;
