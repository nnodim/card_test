import { ProfileMenu } from "@/components/ProfileMenu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useAuthStore from "@/hooks/useAuthStore";
import { sidebarItems } from "@/lib/constants";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

const Searchbar = () => {
  const { user } = useAuthStore();
  return (
    <div className="pt-10">
      <div className="flex justify-between items-end w-full">
        <div className="lg:hidden">
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
                <div className="flex items-center justify-start mb-6">
                  <img
                    src="https://cdn.hashnode.com/res/hashnode/image/upload/v1724143689225/3f4cc19d-6a3a-4b05-8679-e05e722ebb70.png"
                    alt="Logo"
                    className="w-[116px] h-[60px]"
                  />
                </div>
                {sidebarItems.map((item) => (
                  <NavLink
                    key={item.text}
                    to={item.to}
                    className={({ isActive }) =>
                      `hover:text-primary ${
                        isActive ? "text-primary" : "text-[#6D6D6D]"
                      }`
                    }
                    aria-current={item.current ? "page" : undefined}
                  >
                    <SheetTrigger className="w-full flex items-center gap-2 p-2 rounded-lg">
                      {item.icon}
                      <span>{item.text}</span>
                    </SheetTrigger>
                  </NavLink>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex ml-auto items-center gap-x-4">
          <ProfileMenu user={user} />
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
