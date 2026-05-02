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
    <section className="py-20 bg-background mb-5 text-foreground">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold mb-6 text-foreground"
        >
          {heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl mb-8 text-foreground opacity-80"
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
                className="rounded-2xl shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold cursor-pointer transition-all transform hover:scale-105"
              >
                Request a Ride
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl border-primary text-primary hover:bg-primary/10 cursor-pointer font-bold"
                onClick={() => (window.location.href = "/register")}
              >
                Sign Up Now
              </Button>
            </>
          )}

          {/* Rider */}
          {userRole === role.RIDER && (
            <>
              <AddRideModal 
                context="Request a Ride" 
                size="lg"
                className="rounded-2xl shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold cursor-pointer transition-all transform hover:scale-105"
              />
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl border-primary text-primary hover:bg-primary/10 cursor-pointer font-bold"
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
                className="rounded-2xl shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold cursor-pointer transition-all transform hover:scale-105"
                onClick={() => (window.location.href = "/driver/profile")}
              >
                Go Online
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl border-primary text-primary hover:bg-primary/10 cursor-pointer font-bold"
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
              className="rounded-2xl shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold cursor-pointer transition-all transform hover:scale-105"
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
