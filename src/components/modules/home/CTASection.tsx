import { Button } from "@/components/ui/button";
import { role } from "@/constants/role.constant";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { motion } from "framer-motion";

export default function CTASection() {
  const { data, isLoading } = useUserInfoQuery(undefined);
  if (isLoading) {
    <div>Loading....</div>;
  }
  return (
    <section className="py-20 bg-orange-100 dark:bg-gray-900 mb-5">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold mb-6 text-black dark:text-white"
        >
          Ready to Start Your Journey?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300"
        >
          Book your ride in just a few clicks and enjoy a safe, comfortable
          journey.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <Button
            size="lg"
            className="rounded-2xl shadow-lg bg-black dark:bg-orange-500 text-white cursor-pointer"
          >
            Request a Ride
          </Button>
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
        </motion.div>
      </div>
    </section>
  );
}
