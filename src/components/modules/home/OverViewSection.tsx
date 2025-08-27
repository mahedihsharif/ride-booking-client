import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { role } from "@/constants/role.constant";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Check } from "lucide-react";

export default function OverviewSection() {
  const { data } = useUserInfoQuery(undefined);
  const userRole = data?.data?.role;

  // Steps for Rider
  const riderSteps = [
    {
      title: "Choose Your Ride",
      description:
        "Select the best car for your trip from our wide range of vehicles.",
    },
    {
      title: "Book Instantly",
      description:
        "Quickly book your ride in just a few clicks with our easy-to-use platform.",
    },
    {
      title: "Enjoy Your Trip",
      description: "Relax and enjoy the ride with our trusted drivers.",
    },
  ];

  // Steps for Driver
  const driverSteps = [
    {
      title: "Go Online",
      description: "Start receiving ride requests whenever you’re available.",
    },
    {
      title: "Accept Rides",
      description:
        "Pick up riders quickly and drive safely to their destinations.",
    },
    {
      title: "Earn & Track",
      description:
        "Get paid instantly and track your daily earnings in one place.",
    },
  ];

  // Steps for Admin
  const adminSteps = [
    {
      title: "Monitor Rides",
      description:
        "Track live rides and ensure smooth operations across the platform.",
    },
    {
      title: "Manage Drivers & Riders",
      description:
        "Approve, suspend, or support users directly from your dashboard.",
    },
    {
      title: "Analyze Reports",
      description:
        "View revenue, activity, and system health to make informed decisions.",
    },
  ];

  // Default steps (for guest / not logged in)
  const defaultSteps = riderSteps;

  // Which steps to show
  let stepsToRender = defaultSteps;
  let heading = "How It Works";
  let subText =
    "Experience hassle-free ride booking with our simple 3-step process.";

  if (userRole === role.DRIVER) {
    stepsToRender = driverSteps;
    heading = "How Driving Works";
    subText = "Earn money on your own schedule with these simple steps.";
  } else if (userRole === role.ADMIN) {
    stepsToRender = adminSteps;
    heading = "Admin Overview";
    subText = "Control and monitor the entire platform with ease.";
  } else if (userRole === role.RIDER) {
    stepsToRender = riderSteps;
    heading = "How Ride Works";
    subText =
      "Experience hassle-free ride booking with our simple 3-step process.";
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-[#09090B] transition-colors duration-500">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100 transition-colors duration-500">
          {heading}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto transition-colors duration-500">
          {subText}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {stepsToRender.map((step, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
            >
              <CardContent className="text-center space-y-4">
                <div className="flex justify-center">
                  <Check className="text-primary w-6 h-6" />
                </div>
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
