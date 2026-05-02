import { Button } from "@/components/ui/button";
import { role } from "@/constants/role.constant";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { motion } from "framer-motion";
import { AddRideModal } from "../rides/AddRideModal";

export default function BannerSection() {
  const { data, isLoading } = useUserInfoQuery(undefined);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  const userRole = data?.data?.role;

  // Role-based content configuration
  const content = {
    [role.RIDER]: {
      title: (
        <>
          Your Premium <span className="text-primary">Ride</span> <br />
          Anywhere, Anytime.
        </>
      ),
      description: "Experience the next level of comfort and safety with our elite fleet. Book instantly and reach your destination with ease.",
      image: "/banner-rider.png",
    },
    [role.DRIVER]: {
      title: (
        <>
          Drive More, <span className="text-primary">Earn</span> More <br />
          in Dhaka City.
        </>
      ),
      description: "Join our network of professional drivers. Set your own schedule, be your own boss, and maximize your daily earnings.",
      image: "/banner-driver.png",
    },
    [role.ADMIN]: {
      title: (
        <>
          Scale Your <span className="text-primary">Ride</span> <br />
          Booking Operations.
        </>
      ),
      description: "Monitor real-time data, manage users efficiently, and oversee the entire Dhaka city network from one powerful dashboard.",
      image: "/banner-admin.png",
    },
    GUEST: {
      title: (
        <>
          Your Premium <span className="text-primary">Ride</span> <br />
          Anywhere, Anytime.
        </>
      ),
      description: "Experience the next level of comfort and safety with our elite fleet. Book instantly and reach your destination with ease.",
      image: "/banner-rider.png",
    }
  };

  const activeContent = userRole ? content[userRole as keyof typeof content] : content.GUEST;

  return (
    <section
      className="relative min-h-[85vh] flex items-center justify-center bg-background overflow-hidden"
    >
      {/* Hero Image Background */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url('${activeContent.image}')`,
          filter: "brightness(0.7)",
        }}
      />

      {/* Dynamic Overlay for better readability in both modes */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent opacity-90 dark:opacity-80" />

      {/* Content Overlay */}
      <motion.div
        key={userRole || 'guest'}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-7xl px-8 flex flex-col items-start justify-center"
      >
        <div className="max-w-2xl text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-7xl font-extrabold mb-6 text-foreground leading-tight drop-shadow-sm">
              {activeContent.title}
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 dark:text-muted-foreground mb-10 max-w-lg leading-relaxed font-medium">
              {activeContent.description}
            </p>
          </motion.div>

          <div className="flex gap-6 items-center flex-wrap">
            {userRole === role.DRIVER && (
              <Button
                size="lg"
                className="rounded-2xl shadow-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-16 px-10 text-xl transition-all transform hover:scale-105 active:scale-95"
                onClick={() => (window.location.href = "/driver/profile")}
              >
                Go Online Now
              </Button>
            )}

            {(userRole === role.RIDER || !userRole) && (
              <AddRideModal 
                context="Book Your Ride Now →" 
                size="lg"
                className="rounded-2xl shadow-[0_10px_40px_rgba(255,184,108,0.3)] bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-16 px-10 text-xl transition-all transform hover:scale-105 active:scale-95 border-none"
              />
            )}

            {userRole === role.ADMIN && (
              <Button
                size="lg"
                className="rounded-2xl shadow-2xl bg-[#50fa7b] hover:bg-[#40c962] text-primary-foreground font-bold h-16 px-10 text-xl transition-all transform hover:scale-105"
                onClick={() => (window.location.href = "/admin")}
              >
                Go to Dashboard
              </Button>
            )}
            
            <Button
              variant="outline"
              size="lg"
              className="rounded-2xl border-border text-foreground hover:bg-muted h-16 px-8 text-lg font-medium backdrop-blur-sm"
              onClick={() => (window.location.href = "/about")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
