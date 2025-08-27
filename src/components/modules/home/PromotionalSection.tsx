import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { role } from "@/constants/role.constant";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { motion } from "framer-motion";

export default function PromotionsSection() {
  const { data } = useUserInfoQuery(undefined);
  const userRole = data?.data?.role;

  // 🎁 Rider offers
  const riderOffers = [
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

  // 🚖 Driver offers
  const driverOffers = [
    {
      title: "Weekly Bonus",
      description: "Earn up to $100 extra every week with consistent rides.",
      bgColor: "bg-purple-100 dark:bg-gray-700",
    },
    {
      title: "Referral Reward",
      description: "Refer a driver and earn $50 bonus instantly.",
      bgColor: "bg-pink-100 dark:bg-gray-700",
    },
    {
      title: "Fuel Discount",
      description: "Exclusive 10% off on partner fuel stations.",
      bgColor: "bg-orange-100 dark:bg-gray-700",
    },
  ];

  // 👑 Admin offers (more like perks)
  const adminOffers = [
    {
      title: "Analytics Access",
      description: "Get real-time analytics and usage insights for free.",
      bgColor: "bg-red-100 dark:bg-gray-700",
    },
    {
      title: "Priority Support",
      description: "24/7 dedicated admin support at no extra cost.",
      bgColor: "bg-indigo-100 dark:bg-gray-700",
    },
    {
      title: "Team Management",
      description: "Add unlimited team members with no additional fee.",
      bgColor: "bg-teal-100 dark:bg-gray-700",
    },
  ];

  // Default (guest / no role)
  const guestOffers = [
    {
      title: "Welcome Gift",
      description: "Sign up today and get $5 credit instantly.",
      bgColor: "bg-lime-100 dark:bg-gray-700",
    },
    {
      title: "First Ride Free",
      description: "Enjoy your first ride absolutely free on us!",
      bgColor: "bg-blue-100 dark:bg-gray-700",
    },
    {
      title: "Early Access",
      description: "Be the first to try our new features and updates.",
      bgColor: "bg-yellow-100 dark:bg-gray-700",
    },
  ];

  // Role-based selection
  let offers = guestOffers;
  if (userRole === role.RIDER) offers = riderOffers;
  else if (userRole === role.DRIVER) offers = driverOffers;
  else if (userRole === role.ADMIN) offers = adminOffers;

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black dark:text-white">
          Special Offers
        </h2>
        <p className="text-lg md:text-xl mb-12 text-gray-700 dark:text-gray-300">
          {userRole === role.RIDER &&
            "Exclusive discounts and deals for our riders."}
          {userRole === role.DRIVER &&
            "Boost your earnings with our driver special offers."}
          {userRole === role.ADMIN &&
            "Enjoy perks and management features as an admin."}
          {!userRole &&
            "Check out our latest offers and save big on your rides!"}
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
