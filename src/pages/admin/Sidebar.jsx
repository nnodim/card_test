import { SideBarItem } from "@/components/admin/SideBarItem";
import { sidebarItems } from "@/lib/constants";
import * as ScrollArea from "@radix-ui/react-scroll-area";
const Sidebar = () => {
  return (
    <div className="flex flex-col w-full h-full bg-[#7C4CFF] bg-opacity-[6%] pt-8 px-6">
      {/* Logo */}
      <div className="flex items-center justify-start mb-12">
        <img
          src="https://cdn.hashnode.com/res/hashnode/image/upload/v1724143689225/3f4cc19d-6a3a-4b05-8679-e05e722ebb70.png"
          alt="Logo"
          className="w-[116px] h-[60px]"
        />
      </div>

      {/* Sidebar Content */}
      <ScrollArea.Root className="flex flex-col overflow-hidden">
        <ScrollArea.Viewport className="scrollbar-area">
          <div className="flex flex-col items-start gap-y-5">
            {sidebarItems.map((item) => (
              <SideBarItem
                key={item.text}
                icon={item.icon}
                text={item.text}
                to={item.to}
              />
            ))}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 transition-colors duration-150 ease-out data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="flex-1 bg-[#7C7A85] rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
};

export default Sidebar;
