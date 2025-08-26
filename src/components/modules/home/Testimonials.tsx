import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Khan",
      role: "Regular Rider",
      feedback:
        "Booking a ride is so simple and fast! The drivers are always on time and very friendly.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "John Doe",
      role: "Business Traveler",
      feedback:
        "Affordable rides with great comfort. This service has truly made my daily commute hassle-free.",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Ayesha Rahman",
      role: "Student",
      feedback:
        "I feel safe with trusted drivers, and the booking process is incredibly smooth.",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black dark:text-white">
          What Our Customers Say
        </h2>
        <p className="text-lg md:text-xl mb-12 text-gray-700 dark:text-gray-300">
          Real feedback from our happy riders and drivers.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="rounded-2xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
                <CardContent className="flex flex-col items-center text-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-16 h-16 rounded-full border-2 border-orange-500 dark:border-white"
                  />
                  <p className="text-gray-800 dark:text-gray-300 italic">
                    "{t.feedback}"
                  </p>
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    {t.name}
                  </h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {t.role}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
