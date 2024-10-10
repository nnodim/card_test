import useLogout from "@/hooks/useLogout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOGIN } from "@/lib/routes";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ChevronDown, UserCircle2 } from "lucide-react";
import PropTypes from "prop-types";

export const ProfileMenu = ({ user }) => {
  const navigate = useNavigate();
  const logout = useLogout();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  // const profileLink = user?.role === "admin" ? "/dashboard" : "account/profile";

  return (
    <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-x-4">
      {/* <Button
                type="button"
                variant="outline"
                className="relative border border-[#7c4dff8a] h-8 w-8 rounded-full flex  items-center justify-center bg-[#7c4dff0f] p-1 text-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 flex-shrink-0 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" aria-hidden="true" />
              </Button> */}

      <DropdownMenu
        open={isProfileMenuOpen}
        onOpenChange={setIsProfileMenuOpen}
        as="div"
        className="relative ml-3"
      >
        <div>
          <DropdownMenuTrigger className="relative flex items-center rounded-full  focus:outline-none focus:ring-2 group focus:ring-white focus:ring-offset-2 text-xs sm:text-sm md:text-base">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <UserCircle2 className="h-6 w-6 md:h-8 md:w-8 rounded-full text-primary" />
            <p className=" text-primary font-medium ml-2 capitalize">
              {user?.fullName}
            </p>
            <ChevronDown
              className="h-4 w-4 ml-2 text-primary group-data-[state=open]:rotate-180 transition-all"
              aria-hidden="true"
            />
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className="z-[999] mt-2 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <DropdownMenuItem
            asChild
            onSelect={(e) => {
              e.preventDefault();
              setIsProfileMenuOpen(false);
            }}
          >
            <Link
              to="account/profile"
              className="block px-4 py-2  text-gray-700"
            >
              My Profile
            </Link>
          </DropdownMenuItem>
          {user?.role === "user" ? (
            <DropdownMenuItem
              asChild
              onSelect={(e) => {
                e.preventDefault();
                setIsProfileMenuOpen(false);
              }}
            >
              <Link
                to="account/my-cards"
                className="block px-4 py-2  text-gray-700"
              >
                My Cards
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              asChild
              onSelect={(e) => {
                e.preventDefault();
                setIsProfileMenuOpen(false);
              }}
            >
              <Link to="/dashboard" className="block px-4 py-2  text-gray-700">
                Admin dashboard
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            asChild
            onSelect={(e) => {
              e.preventDefault();
              setIsProfileMenuOpen(false);
            }}
          >
            <Link to="" className="block px-4 py-2  text-gray-700">
              Report an Issue
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            onSelect={(e) => {
              e.preventDefault();
              setIsProfileMenuOpen(false);
            }}
          >
            <Button
              variant="link"
              className="w-full justify-start px-4 py-2 text-[#FC5757] focus:text-[#FC5757] hover:no-underline hover:outline-none "
              onClick={async () => {
                await logout();
                navigate(user?.role === "admin" ? "/admin-login" : LOGIN);
              }}
            >
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

ProfileMenu.propTypes = {
  user: PropTypes.object,
};
