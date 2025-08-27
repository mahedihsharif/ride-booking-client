import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { role } from "@/constants/role.constant";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Skeleton } from "../ui/skeleton";
import { ModeToggle } from "./ModeToogler";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/faq", label: "Faq", role: "PUBLIC" },
  { href: "/sos", label: "SOS", role: role.RIDER },
  { href: "/sos", label: "SOS", role: role.DRIVER },
  { href: "/rider", label: "Dashboard", role: role.RIDER },
  { href: "/driver", label: "Dashboard", role: role.DRIVER },
  { href: "/admin", label: "Dashboard", role: role.ADMIN },
];

const Navbar = () => {
  const { data, isLoading } = useUserInfoQuery(undefined);

  const [scrolled, setScrolled] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  if (isLoading) {
    <Skeleton className="h-[20px] w-[100px] rounded-full" />;
  }
  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-gray-900" : "border-b dark:bg-[#09090B]"
      }`}
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {!isLoading &&
                    navigationLinks.map((link, index) => (
                      <React.Fragment key={index}>
                        {link.role === "PUBLIC" && (
                          <NavigationMenuItem>
                            <NavigationMenuLink
                              asChild
                              className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                            >
                              <Link to={link.href}>{link.label}</Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        )}
                        {link.role === data?.data?.role && (
                          <NavigationMenuItem>
                            <NavigationMenuLink
                              asChild
                              className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                            >
                              <Link to={link.href}>{link.label}</Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        )}
                      </React.Fragment>
                    ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link to={"/"} className="text-primary hover:text-primary/90">
              <Logo />
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {!isLoading &&
                  navigationLinks.map((link, index) => (
                    <React.Fragment key={index}>
                      {link.role === "PUBLIC" && (
                        <NavigationMenuItem>
                          <NavigationMenuLink
                            asChild
                            className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                          >
                            <Link to={link.href}>{link.label}</Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )}
                      {link.role === data?.data?.role && (
                        <NavigationMenuItem>
                          <NavigationMenuLink
                            asChild
                            className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                          >
                            <Link to={link.href}>{link.label}</Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )}
                    </React.Fragment>
                  ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {data?.data?.email && (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-sm cursor-pointer"
            >
              Logout
            </Button>
          )}
          {!data?.data?.email && (
            <Button asChild className="text-sm">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
