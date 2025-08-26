import { Button } from "@/components/ui/button";
import { role } from "@/constants/role.constant";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { motion } from "framer-motion";
import { AddRideModal } from "../rides/AddRideModal";

export default function BannerSection() {
  const { data, isLoading } = useUserInfoQuery(undefined);
  if (isLoading) {
    <div>Loading....</div>;
  }

  return (
    <section
      className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1350&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-2xl px-4"
      >
        {data?.data.role === role.DRIVER ? (
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-orange-500 dark:text-white">
            Drive & Earn on Your Schedule 🚖
          </h1>
        ) : (
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-orange-500 dark:text-white">
            Find Your Ride, Anytime 🚖
          </h1>
        )}
        {data?.data.role === role.DRIVER ? (
          <p className="text-lg md:text-xl mb-8 text-orange-400 dark:text-gray-300">
            Earn more by driving safe and reliable. Your road, your schedule,
            your success.
          </p>
        ) : (
          <p className="text-lg md:text-xl mb-8 text-orange-400 dark:text-gray-300">
            Book affordable rides instantly with trusted drivers. Your journey,
            your comfort, your choice.
          </p>
        )}

        <div className="flex gap-4 justify-center">
          {data?.data.role === role.DRIVER ? (
            <Button
              size="lg"
              className="rounded-2xl shadow-lg bg-blue-600 dark:bg-[#F54900] text-white cursor-pointer"
            >
              <AddRideModal context="Go Online" />
            </Button>
          ) : (
            <Button
              size="lg"
              className="rounded-2xl shadow-lg bg-blue-600 dark:bg-[#F54900] text-white cursor-pointer"
            >
              <AddRideModal context="Request a Ride" />
            </Button>
          )}

          {data?.data.role === role.RIDER && (
            <Button
              size="lg"
              variant="outline"
              className="rounded-2xl border-black dark:border-white text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white cursor-pointer"
            >
              Become a Driver
            </Button>
          )}
          {data?.data.role === role.DRIVER && (
            <Button
              size="lg"
              variant="outline"
              className="rounded-2xl border-black dark:border-white text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white cursor-pointer"
            >
              Become a Rider
            </Button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
