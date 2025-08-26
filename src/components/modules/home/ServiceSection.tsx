import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      title: "Fast Booking",
      description: "Book your ride in just a few clicks and save time.",
      icon: <Check className="w-6 h-6 text-orange-500 dark:text-white" />,
    },
    {
      title: "Trusted Drivers",
      description: "Our drivers are verified and rated for your safety.",
      icon: <Check className="w-6 h-6 text-orange-500 dark:text-white" />,
    },
    {
      title: "Affordable Rides",
      description: "Get rides at the best prices with no hidden charges.",
      icon: <Check className="w-6 h-6 text-orange-500 dark:text-white" />,
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black dark:text-white">
          Our Services
        </h2>
        <p className="text-lg md:text-xl mb-12 text-gray-700 dark:text-gray-300">
          Experience convenience, safety, and affordability with every ride.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="rounded-2xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardContent className="flex flex-col items-center text-center gap-4">
                  <div className="p-4 bg-orange-100 dark:bg-gray-700 rounded-full">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-black dark:text-white">
                    {service.title}
                  </CardTitle>
                  <p className="text-gray-800 dark:text-gray-300">
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
