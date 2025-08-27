import { Button } from "@/components/ui/button";
import { role } from "@/constants/role.constant";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { motion } from "framer-motion";
import { AddRideModal } from "../rides/AddRideModal";

export default function CTASection() {
  const { data, isLoading } = useUserInfoQuery(undefined);
  const userRole = data?.data?.role;

  if (isLoading) {
    return <div>Loading....</div>;
  }

  const heading = "Ready to Start Your Journey?";
  const subText =
    "Book your ride in just a few clicks and enjoy a safe, comfortable journey.";

  return (
    <section className="py-20 bg-orange-100 dark:bg-gray-900 mb-5">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold mb-6 text-black dark:text-white"
        >
          {heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300"
        >
          {subText}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          {/* Guest / Logged out user */}
          {!userRole && (
            <>
              <Button
                size="lg"
                className="rounded-2xl shadow-lg bg-black dark:bg-orange-500 text-white cursor-pointer"
              >
                Request a Ride
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl border-black dark:border-white text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                onClick={() => (window.location.href = "/register")}
              >
                Sign Up Now
              </Button>
            </>
          )}

          {/* Rider */}
          {userRole === role.RIDER && (
            <>
              <Button
                size="lg"
                className="rounded-2xl shadow-lg bg-black dark:bg-orange-500 text-white cursor-pointer"
              >
                <AddRideModal context={"Request a Ride"} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl border-black dark:border-white text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                onClick={() => (window.location.href = "/rider/profile")}
              >
                Become a Driver
              </Button>
            </>
          )}

          {/* Driver */}
          {userRole === role.DRIVER && (
            <>
              <Button
                size="lg"
                className="rounded-2xl shadow-lg bg-black dark:bg-orange-500 text-white cursor-pointer"
                onClick={() => (window.location.href = "/driver/profile")}
              >
                Go Online
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl border-black dark:border-white text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                onClick={() => (window.location.href = "/driver/profile")}
              >
                Become a Rider
              </Button>
            </>
          )}

          {/* Admin */}
          {userRole === role.ADMIN && (
            <Button
              size="lg"
              className="rounded-2xl shadow-lg bg-black dark:bg-orange-500 text-white cursor-pointer"
              onClick={() => (window.location.href = "/admin")}
            >
              Manage Dashboard
            </Button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
