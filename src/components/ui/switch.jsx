import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer group inline-flex justify-between h-6 w-16 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-[#666666]",
      className
    )}
    {...props}
    ref={ref}
  >
    <p className="ml-2 hidden text-white text-xs group-data-[state=checked]:block transition-all">
      Yes
    </p>
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0"
      )}
    />
    <p className="mr-3 hidden text-white text-xs group-data-[state=unchecked]:block transition-all">
      No
    </p>
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
