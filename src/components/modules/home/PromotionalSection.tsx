import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function PromotionsSection() {
  const offers = [
    {
      title: "Summer Discount",
      description: "Get 20% off on all rides booked this summer.",
      bgColor: "bg-yellow-100 dark:bg-gray-700",
    },
    {
      title: "Student Offer",
      description: "Students get 15% off on every ride with student ID.",
      bgColor: "bg-green-100 dark:bg-gray-700",
    },
    {
      title: "First Ride Free",
      description: "New users enjoy their first ride absolutely free!",
      bgColor: "bg-blue-100 dark:bg-gray-700",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black dark:text-white">
          Special Offers
        </h2>
        <p className="text-lg md:text-xl mb-12 text-gray-700 dark:text-gray-300">
          Check out our latest offers and save on your rides!
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card
                className={`rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 ${offer.bgColor}`}
              >
                <CardContent className="flex flex-col items-center text-center gap-4 p-6">
                  <CardTitle className="text-xl font-semibold text-black dark:text-white">
                    {offer.title}
                  </CardTitle>
                  <p className="text-gray-800 dark:text-gray-300">
                    {offer.description}
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
