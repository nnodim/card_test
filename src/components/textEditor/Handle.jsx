/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const Handle = forwardRef((props, ref) => {
  const { handleAxis, ...restProps } = props;
  return (
    <div
      ref={ref}
      className={cn(
        `handle-${handleAxis} h-3 w-3 absolute  rounded-full bg-[#008EE6] z-50`,
        {
          "-right-[6px] top-1/2 hover:cursor-ew-resize": handleAxis === "e",
          "-right-[6px] -top-[6px] hover:cursor-nesw-resize":
            handleAxis === "ne",
          "-left-[6px] -top-[6px] hover:cursor-nwse-resize": handleAxis === "nw",
          "-right-[6px] -bottom-[6px] hover:cursor-nwse-resize": handleAxis === "se",
          "-left-[6px] -bottom-[6px] hover:cursor-nesw-resize": handleAxis === "sw",
        },
        {
          "hover:bg-primary": handleAxis !== "e" && handleAxis !== "w",
        }
      )}
      {...restProps}
    ></div>
  );
});

Handle.displayName = "Handle";
