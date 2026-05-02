import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Bike, Calendar, Car, Clock, Package } from "lucide-react";
import React from "react";

// suggestion data
type Suggestion = {
  title: string;
  description: string;
  fullDetails: string;
  icon: React.ReactNode;
};

const suggestions: Suggestion[] = [
  {
    title: "Ride",
    description: "Go anywhere with Uber. Request a ride, hop in, and go.",
    fullDetails: "Our Ride service offers a reliable and comfortable way to reach your destination. Whether you need a quick trip across town or a ride to the airport, you can choose from a variety of vehicle options. Enjoy upfront pricing, real-time tracking, and safe, verified drivers.",
    icon: <Car className="w-12 h-12 text-primary" />,
  },
  {
    title: "Reserve",
    description:
      "Reserve your ride in advance so you can relax on the day of your trip.",
    fullDetails: "Plan ahead with our Reserve feature. Schedule your ride up to 30 days in advance, lock in your price, and get matched with a driver well before your pickup time. Perfect for important meetings, flights, or events where punctuality is non-negotiable.",
    icon: <Calendar className="w-12 h-12 text-primary" />,
  },
  {
    title: "Intercity",
    description:
      "Get convenient, affordable outstation cabs anytime at your door.",
    fullDetails: "Traveling out of town? Intercity rides provide comfortable outstation cabs right to your doorstep. Enjoy the convenience of retaining the same car and driver for your entire journey, whether it's a one-way drop or a round trip across cities.",
    icon: <Clock className="w-12 h-12 text-primary" />,
  },
  {
    title: "Courier",
    description: "Uber makes same-day item delivery easier than ever.",
    fullDetails: "Send packages quickly and securely with our Courier service. From documents to gifts, get same-day delivery with real-time tracking. Simply request a pickup, hand your item to the driver, and track it until it safely reaches the recipient.",
    icon: <Package className="w-12 h-12 text-primary" />,
  },
  {
    title: "Rentals",
    description: "Request a trip for a block of time and make multiple stops.",
    fullDetails: "Need a car for a few hours? With Rentals, you can book a vehicle and driver for a set number of hours. Keep the car with you as you make multiple stops, run errands, or attend meetings without the hassle of booking a new ride each time.",
    icon: <Car className="w-12 h-12 text-primary" />,
  },
  {
    title: "Bike",
    description: "Get affordable motorbike rides in minutes at your doorstep.",
    fullDetails: "Beat the traffic with our Bike rides. Motorbike taxis offer a fast, affordable, and efficient way to navigate busy city streets. Helmets are provided, and all drivers are trained for safety, ensuring a quick and secure trip.",
    icon: <Bike className="w-12 h-12 text-primary" />,
  },
];

const SuggestionsSection: React.FC = () => {
  return (
    <section className="py-12 px-4 md:px-12 bg-background text-foreground">
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="mt-auto rounded-full cursor-pointer bg-primary/20 hover:bg-primary/30 text-primary font-bold">
                      Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3 text-2xl text-foreground">
                        {item.icon} {item.title}
                      </DialogTitle>
                      <DialogDescription className="text-base mt-4 text-muted-foreground leading-relaxed">
                        {item.fullDetails}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end mt-4">
                      <Button onClick={() => (window.location.href = "/register")} className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8">
                        Try {item.title} Now
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SuggestionsSection;
