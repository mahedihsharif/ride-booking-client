import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import BannerSection from "@/components/modules/home/BannerSection";
import CTASection from "@/components/modules/home/CTASection";
import OverviewSection from "@/components/modules/home/OverViewSection";
import PromotionsSection from "@/components/modules/home/PromotionalSection";
import ServicesSection from "@/components/modules/home/ServiceSection";
import SuggestionsSection from "@/components/modules/home/SuggestionsSection";
import TestimonialsSection from "@/components/modules/home/Testimonials";
const HomePage = () => {
    return (_jsxs("div", { className: "container mx-auto", children: [_jsx(BannerSection, {}), _jsx(SuggestionsSection, {}), _jsx(OverviewSection, {}), _jsx(ServicesSection, {}), _jsx(TestimonialsSection, {}), _jsx(CTASection, {}), _jsx(PromotionsSection, {})] }));
};
export default HomePage;
