import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function OverviewSection() {
  const steps = [
    {
      title: "Choose Your Ride",
      description:
        "Select the best car for your trip from our wide range of vehicles.",
      icon: <Check className="text-primary w-6 h-6" />,
    },
    {
      title: "Book Instantly",
      description:
        "Quickly book your ride in just a few clicks with our easy-to-use platform.",
      icon: <Check className="text-primary w-6 h-6" />,
    },
    {
      title: "Enjoy Your Trip",
      description: "Relax and enjoy the ride with our trusted drivers.",
      icon: <Check className="text-primary w-6 h-6" />,
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-[#09090B] transition-colors duration-500">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100 transition-colors duration-500">
          How It Works
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto transition-colors duration-500">
          Experience hassle-free ride booking with our simple 3-step process.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
            >
              <CardContent className="text-center space-y-4">
                <div className="flex justify-center">{step.icon}</div>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-500">
                  {step.title}
                </CardTitle>
                <p className="text-gray-500 dark:text-gray-300 transition-colors duration-500">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
