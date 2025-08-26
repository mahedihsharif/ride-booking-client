import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function Features() {
  const features = {
    Rider: [
      "Book rides instantly or schedule in advance",
      "Real-time ride tracking on the map",
      "Secure payment options (Cash / Card / Wallet)",
      "Ratings & Reviews for drivers",
      "Ride history & digital receipts",
    ],
    Driver: [
      "Accept or reject ride requests",
      "Navigation & optimized routes",
      "Earnings dashboard & daily reports",
      "Rating system to review riders",
      "Flexible online/offline availability",
    ],
    Admin: [
      "Manage riders & drivers from dashboard",
      "Real-time monitoring of rides",
      "Payment & commission management",
      "Analytics & performance reports",
      "Promo codes & discounts control",
    ],
  };

  return (
    <section className="container mx-auto py-20 px-6 bg-background dark:bg-background">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground dark:text-white">
          Features
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          A complete solution tailored for Riders, Drivers, and Admins.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(features).map(([role, items]) => (
          <Card
            key={role}
            className="shadow-lg rounded-2xl border border-border bg-card text-card-foreground dark:bg-card dark:text-white"
          >
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">
                {role} Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
