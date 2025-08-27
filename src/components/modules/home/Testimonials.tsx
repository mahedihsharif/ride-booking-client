import { Card, CardContent } from "@/components/ui/card";
import { role } from "@/constants/role.constant";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const { data } = useUserInfoQuery(undefined);
  const userRole = data?.data?.role;

  // Rider Testimonials
  const riderTestimonials = [
    {
      name: "Sarah Khan",
      role: "Regular Rider",
      feedback:
        "Booking a ride is so simple and fast! The drivers are always on time and very friendly.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "John Doe",
      role: "Business Traveler",
      feedback:
        "Affordable rides with great comfort. This service has truly made my daily commute hassle-free.",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Ayesha Rahman",
      role: "Student",
      feedback:
        "I feel safe with trusted drivers, and the booking process is incredibly smooth.",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
  ];

  // Driver Testimonials
  const driverTestimonials = [
    {
      name: "Kamal Uddin",
      role: "Full-time Driver",
      feedback:
        "I love the flexibility! I can drive whenever I want and still manage my personal life easily.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Rashida Akter",
      role: "Part-time Driver",
      feedback:
        "The instant payouts are amazing. I can earn daily and never worry about delays.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Imran Hossain",
      role: "Driver",
      feedback:
        "Support team is always there to help. Feels great to be part of a trusted platform.",
      image: "https://randomuser.me/api/portraits/men/14.jpg",
    },
  ];

  // Admin Testimonials
  const adminTestimonials = [
    {
      name: "Platform Manager",
      role: "Admin",
      feedback:
        "The analytics dashboard helps me track performance and ensure smooth operations every day.",
      image: "https://randomuser.me/api/portraits/men/71.jpg",
    },
    {
      name: "Safety Supervisor",
      role: "Admin",
      feedback:
        "Managing drivers and riders has never been easier. Everything is transparent and reliable.",
      image: "https://randomuser.me/api/portraits/women/75.jpg",
    },
    {
      name: "System Admin",
      role: "Admin",
      feedback:
        "The monitoring tools make it super easy to detect issues and solve them quickly.",
      image: "https://randomuser.me/api/portraits/men/64.jpg",
    },
  ];

  // Default fallback
  let testimonialsToRender = riderTestimonials;
  let heading = "What Our Customers Say";
  let subText = "Real feedback from our happy riders and drivers.";

  if (userRole === role.DRIVER) {
    testimonialsToRender = driverTestimonials;
    heading = "What Our Drivers Say";
    subText = "Stories from our dedicated driving partners.";
  } else if (userRole === role.ADMIN) {
    testimonialsToRender = adminTestimonials;
    heading = "What Our Admins Say";
    subText = "Insights from the people who keep the system running.";
  } else if (userRole === role.RIDER) {
    testimonialsToRender = riderTestimonials;
    heading = "What Our Riders Say";
    subText = "Experiences shared by our trusted riders.";
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black dark:text-white">
          {heading}
        </h2>
        <p className="text-lg md:text-xl mb-12 text-gray-700 dark:text-gray-300">
          {subText}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonialsToRender.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="rounded-2xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6">
                <CardContent className="flex flex-col items-center text-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-16 h-16 rounded-full border-2 border-orange-500 dark:border-white"
                  />
                  <p className="text-gray-800 dark:text-gray-300 italic">
                    "{t.feedback}"
                  </p>
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    {t.name}
                  </h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {t.role}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
