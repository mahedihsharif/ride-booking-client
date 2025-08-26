import Logo from "@/assets/icons/Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-[#09090B]  text-black dark:text-white">
      <div className="mx-auto container space-y-8 px-4 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-foreground">
              <Logo />
            </div>

            <p className="mt-4 max-w-xs text-gray-700 dark:text-gray-300">
              Book rides easily with trusted drivers anytime, anywhere. Your
              comfort, our priority.
            </p>

            <ul className="mt-8 flex gap-6">
              {/* Social Media */}
              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"
                >
                  <span className="sr-only">Facebook</span>
                  {/* Facebook SVG */}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"
                >
                  <span className="sr-only">Instagram</span>
                  {/* Instagram SVG */}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"
                >
                  <span className="sr-only">Twitter</span>
                  {/* Twitter SVG */}
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-black dark:text-white">Services</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Book a Ride
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Become a Driver
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Ride History
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Premium Rides
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-black dark:text-white">Company</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Meet the Team
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-black dark:text-white">
                Helpful Links
              </p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Support Chat
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-black dark:text-white">Legal</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:opacity-75">
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          &copy; 2025 RideBookingApp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
