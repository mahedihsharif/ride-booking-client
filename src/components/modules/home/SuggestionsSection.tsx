import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bike, Calendar, Car, Clock, Package } from "lucide-react";
import React from "react";

// suggestion data
type Suggestion = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const suggestions: Suggestion[] = [
  {
    title: "Ride",
    description: "Go anywhere with Uber. Request a ride, hop in, and go.",
    icon: <Car className="w-12 h-12 text-primary" />,
  },
  {
    title: "Reserve",
    description:
      "Reserve your ride in advance so you can relax on the day of your trip.",
    icon: <Calendar className="w-12 h-12 text-primary" />,
  },
  {
    title: "Intercity",
    description:
      "Get convenient, affordable outstation cabs anytime at your door.",
    icon: <Clock className="w-12 h-12 text-primary" />,
  },
  {
    title: "Courier",
    description: "Uber makes same-day item delivery easier than ever.",
    icon: <Package className="w-12 h-12 text-primary" />,
  },
  {
    title: "Rentals",
    description: "Request a trip for a block of time and make multiple stops.",
    icon: <Car className="w-12 h-12 text-primary" />,
  },
  {
    title: "Bike",
    description: "Get affordable motorbike rides in minutes at your doorstep.",
    icon: <Bike className="w-12 h-12 text-primary" />,
  },
];

const SuggestionsSection: React.FC = () => {
  return (
    <section className="py-12 px-4 md:px-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Suggestions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="rounded-2xl shadow-md border dark:border-gray-700 hover:shadow-lg transition">
              <CardContent className="p-6 flex flex-col items-start gap-4">
                {item.icon}
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
                <Button variant="secondary" className="mt-auto rounded-full">
                  Details
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SuggestionsSection;
