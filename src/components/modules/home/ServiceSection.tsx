import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { role } from "@/constants/role.constant";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function ServicesSection() {
  const { data } = useUserInfoQuery(undefined);
  const userRole = data?.data?.role;

  // Rider services
  const riderServices = [
    {
      title: "Fast Booking",
      description: "Book your ride in just a few clicks and save time.",
    },
    {
      title: "Trusted Drivers",
      description: "Our drivers are verified and rated for your safety.",
    },
    {
      title: "Affordable Rides",
      description: "Get rides at the best prices with no hidden charges.",
    },
  ];

  // Driver services
  const driverServices = [
    {
      title: "Flexible Schedule",
      description: "Drive when you want, no fixed timings – total freedom.",
    },
    {
      title: "Instant Earnings",
      description: "Get paid after every ride directly to your account.",
    },
    {
      title: "Driver Support",
      description: "24/7 dedicated support to help you on the road.",
    },
  ];

  // Admin services
  const adminServices = [
    {
      title: "Platform Monitoring",
      description: "Keep track of all rides, payments, and system health.",
    },
    {
      title: "User Management",
      description: "Approve, block, or support drivers and riders anytime.",
    },
    {
      title: "Analytics & Reports",
      description: "Access ride volume, revenue trends, and performance stats.",
    },
  ];

  // default = Rider
  let servicesToRender = riderServices;
  let heading = "Our Services";
  let subText =
    "Experience convenience, safety, and affordability with every ride.";

  if (userRole === role.DRIVER) {
    servicesToRender = driverServices;
    heading = "Driver Services";
    subText = "Maximize your earnings and drive with confidence.";
  } else if (userRole === role.ADMIN) {
    servicesToRender = adminServices;
    heading = "Admin Services";
    subText = "Manage, monitor, and optimize the entire platform easily.";
  } else if (userRole === role.RIDER) {
    servicesToRender = riderServices;
    heading = "Our Services";
    subText =
      "Experience convenience, safety, and affordability with every ride.";
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
          {heading}
        </h2>
        <p className="text-lg md:text-xl mb-12 text-muted-foreground">
          {subText}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {servicesToRender.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="rounded-2xl shadow-lg bg-card border-border">
                <CardContent className="flex flex-col items-center text-center gap-4">
                  <div className="p-4 bg-[#50fa7b]/20 dark:bg-[#50fa7b]/10 rounded-full">
                    <Check className="w-6 h-6 text-[#50fa7b]" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {service.title}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
