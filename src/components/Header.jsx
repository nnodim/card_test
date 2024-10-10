import { iconPurple } from "@/assets";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useAuthStore from "@/hooks/useAuthStore";
import {
  // ACCOUNT,
  DEMO,
  EXPLORE,
  HOME,
  LOGIN,
  OURSTORY,
  PRICING,
  SIGNUP,
} from "@/lib/routes";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { ProfileMenu } from "./ProfileMenu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";

const navigation = [
  { name: "Home", href: HOME },
  { name: "Explore Occasions", href: EXPLORE },
  { name: "Demo", href: DEMO },
  { name: "Pricing", href: PRICING },
];

export const Header = () => {
  const { user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
  };
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  return (
    <header className="py-5 px-2 sm:px-6 lg:px-8 sticky top-0 z-50 bg-white w-full">
      <nav className="relative flex items-center justify-between mx-auto max-w-7xl">
        <div className="flex flex-1 items-center justify-between h-full">
          <div className="flex items-center lg:hidden">
            {/* Mobile menu button*/}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  type="button"
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" size="full">
                <SheetHeader>
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Navigation
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-1 flex flex-col pt-4 pb-3">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) => {
                        return cn(
                          isActive
                            ? "text-primary"
                            : "text-[#4F4F4F] hover:text-primary",
                          "py-2 transition-all"
                        );
                      }}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <SheetTrigger className="w-full text-left">
                        {item.name}
                      </SheetTrigger>
                    </NavLink>
                  ))}
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="mb-2">
                      <AccordionTrigger className="flex items-center font-normal text-[#4F4F4F] hover:text-primary py-2 transition-all hover:no-underline data-[state=open]:text-primary">
                        Our Story
                      </AccordionTrigger>
                      <AccordionContent className="pb-0">
                        <div className="flex flex-col gap-2">
                          <SheetTrigger asChild className="w-full">
                            <HashLink
                              scroll={scrollWithOffset}
                              smooth
                              className="text-[#4F4F4F] hover:text-primary py-2 transition-all border-b"
                              to={`${OURSTORY}#about`}
                            >
                              About Celebration e-Cards
                            </HashLink>
                          </SheetTrigger>
                          <SheetTrigger asChild className="w-full">
                            <HashLink
                              scroll={scrollWithOffset}
                              smooth
                              to={`${OURSTORY}#vision`}
                              className="text-[#4F4F4F] hover:text-primary py-2 transition-all border-b"
                            >
                              Our Vision
                            </HashLink>
                          </SheetTrigger>
                          <SheetTrigger asChild className="w-full">
                            <HashLink
                              scroll={scrollWithOffset}
                              smooth
                              to={`${OURSTORY}#mission`}
                              className="text-[#4F4F4F] hover:text-primary py-2 transition-all border-b"
                            >
                              Our Mission
                            </HashLink>
                          </SheetTrigger>
                          <SheetTrigger asChild className="w-full">
                            <HashLink
                              scroll={scrollWithOffset}
                              smooth
                              to={`${OURSTORY}#principle`}
                              className="text-[#4F4F4F] hover:text-primary py-2 transition-all"
                            >
                              Our Core Principles
                            </HashLink>
                          </SheetTrigger>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  {!user && <div className="lg:hidden flex flex-col gap-4 sm:static sm:pr-0">
                    <Link to={SIGNUP}>
                      <Button
                        type="button"
                        className="w-full max-w-[200px] bg-primary px-8 rounded-lg text-white hover:bg-[#7c4dffe6] hover:text-white"
                      >
                        Sign Up
                      </Button>
                    </Link>
                    <Link to={LOGIN}>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full max-w-[200px] text-primary px-8 rounded-lg border-primary hover:text-primary"
                      >
                        Login
                      </Button>
                    </Link>
                  </div>}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center">
            <Link to="/">
              <img
                className="block h-7 md:h-[52px] w-auto"
                src={iconPurple}
                alt="Your Company"
              />
            </Link>
          </div>
          {/* Navigation */}
          <div className="hidden sm:ml-6 lg:block text-center">
            <div className="flex space-x-4 items-center">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) => {
                    return cn(
                      isActive
                        ? "text-primary"
                        : "text-[#4F4F4F] hover:text-primary",
                      "px-3 py-2 transition-all"
                    );
                  }}
                  aria-current={item.current ? "page" : undefined}
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.name}</span>
                      <div
                        className={
                          isActive ? "w-4 h-0.5 bg-primary mx-auto" : ""
                        }
                      ></div>
                    </>
                  )}
                </NavLink>
              ))}
              <DropdownMenu
                open={isMenuOpen}
                onOpenChange={setIsMenuOpen}
                className="relative ml-3"
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="link"
                    className="flex items-center font-normal text-[#4F4F4F] hover:text-primary px-3 py-2 transition-all hover:no-underline"
                  >
                    <span>Our Story</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 ml-2 text-primary transition-all",
                        {
                          "rotate-180": isMenuOpen,
                        }
                      )}
                      aria-hidden="true"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  onCloseAutoFocus={(e) => e.preventDefault()}
                  className="z-[999] mt-2 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <DropdownMenuItem asChild onSelect={(e) => closeMenu(e)}>
                    <HashLink
                      scroll={scrollWithOffset}
                      smooth
                      to={`${OURSTORY}#about`}
                    >
                      About Celebration e-Cards
                    </HashLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild onSelect={(e) => closeMenu(e)}>
                    <HashLink
                      scroll={scrollWithOffset}
                      smooth
                      to={`${OURSTORY}#vision`}
                    >
                      Our Vision
                    </HashLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild onSelect={(e) => closeMenu(e)}>
                    <HashLink
                      scroll={scrollWithOffset}
                      smooth
                      to={`${OURSTORY}#mission`}
                    >
                      Our Mission
                    </HashLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild onSelect={(e) => closeMenu(e)}>
                    <HashLink
                      scroll={scrollWithOffset}
                      smooth
                      to={`${OURSTORY}#principle`}
                    >
                      Our Core Principles
                    </HashLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {/* Profile */}
          {!user ? (
            <div className="hidden absolute inset-y-0 right-0 lg:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Link to={SIGNUP}>
                <Button
                  type="button"
                  className="bg-primary px-8 rounded-lg text-white hover:bg-[#7c4dffe6] hover:text-white"
                >
                  Sign Up
                </Button>
              </Link>
              <Link to={LOGIN}>
                <Button
                  type="button"
                  variant="outline"
                  className="ml-4 text-primary px-8 rounded-lg border-primary hover:text-primary"
                >
                  Login
                </Button>
              </Link>
            </div>
          ) : (
            <ProfileMenu user={user} />
          )}
        </div>
      </nav>
    </header>
  );
};
