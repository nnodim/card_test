import { useDataStore } from "@/hooks/useDataStore";
import { cn } from "@/lib/utils";
import { Check, Circle } from "lucide-react";
import PropTypes from "prop-types";

const DisabledLink = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

const Stepper = ({ card }) => {
  const { activeTab } = useDataStore();

  return (
    <div className="mt-4 flex lg:flex-col h-fit w-full lg:max-w-fit lg:h-[420px] bg-white px-4">
      <div className="w-full flex-1 min-w-[90px] text-sm flex flex-col-reverse lg:flex-row items-center gap-4 py-0 px-2 lg:p-0 font-medium">
        <div className="h-7 w-7 lg:h-10 lg:w-10  flex rounded-full border border-primary bg-primary-200 flex-shrink-0 justify-center items-center">
          <Check className="text-primary h-3 w-3 lg:h-5 lg:w-5" />
        </div>
        <p className="text-primary text-nowrap text-xs sm:text-base">
          Select Card
        </p>
      </div>

      <div className="w-full hidden lg:block relative">
        <div className="relative lg:left-5 w-px h-24 bg-primary"></div>
      </div>

      <div
        className={`relative group p-0 bg-inherit w-full flex-1 min-w-[90px] flex flex-col-reverse lg:flex-row justify-start items-center gap-4 py-0 px-2 lg:p-0`}
      >
        <div className="flex-grow flex-shrink basis-auto lg:hidden absolute top-12 left-[calc(-50%+20px)] right-[calc(50%+20px)] h-px w-[calc(100%-40px)] bg-primary"></div>
        <span className="w-full flex-1 min-w-[90px] flex flex-col-reverse lg:flex-row items-center gap-4 font-medium">
          <div
            className={cn(
              "relative h-7 w-7 lg:h-10 lg:w-10  flex rounded-full border border-primary bg-primary-200 flex-shrink-0 justify-center items-center",
              {
                "border-none": activeTab === "1",
              }
            )}
          >
            <Circle
              className={`absolute opacity-0 ${
                activeTab === "1" && "opacity-100"
              } h-3 w-3 lg:h-5 lg:w-5  bg-primary text-primary rounded-full transition-all duration-300`}
            />
            <Check
              className={cn(
                "absolute opacity-0 text-primary h-3 w-3 lg:h-5 lg:w-5 transition-all duration-300",
                { "opacity-100": activeTab > "1" }
              )}
            />
          </div>
          <p
            className={cn(
              "text-xs sm:text-base text-[#707070] transition-all duration-300",
              {
                "text-primary": activeTab > "1",
                "text-[#000066]": activeTab === "1",
              }
            )}
          >
            Personalise
          </p>
        </span>
      </div>

      <div className="w-full relative hidden lg:block">
        <div
          className={cn(
            "relative lg:left-5 w-px h-24 bg-[#D0D5DD] transition-all duration-300",
            activeTab > "1" && "bg-primary"
          )}
        ></div>
      </div>

      {card?.customizable && (
        <>
          <div className="relative group p-0 bg-inherit w-full flex-1 min-w-[90px] flex flex-col-reverse lg:flex-row justify-start items-center gap-4 py-0 px-2 lg:p-0">
            <div
              className={cn(
                "flex-grow flex-shrink basis-auto lg:hidden absolute top-12 left-[calc(-50%+20px)] right-[calc(50%+20px)] h-px w-[calc(100%-40px)] bg-[#D0D5DD] transition-all duration-300",
                {
                  "bg-primary": activeTab > "1",
                }
              )}
            ></div>
            <div
              className={`h-7 w-7 lg:h-10 lg:w-10  flex rounded-full border border-primary ${
                activeTab === "2" && "border-none"
              } bg-primary-200 flex-shrink-0 justify-center items-center`}
            >
              <Circle
                className={`absolute opacity-0 ${
                  activeTab === "2" && "opacity-100"
                } h-3 w-3 lg:h-5 lg:w-5  bg-primary text-primary rounded-full transition-all duration-300`}
              />
              <Check
                className={cn(
                  "absolute opacity-0 text-primary h-3 w-3 lg:h-5 lg:w-5 transition-all duration-300",
                  { "opacity-100": activeTab > "2" }
                )}
              />
            </div>
            <p
              className={cn(
                "text-xs sm:text-base text-[#707070] transition-all duration-300",
                {
                  "text-primary": activeTab > "2",
                  "text-[#000066]": activeTab === "2",
                }
              )}
            >
              Preview
            </p>
          </div>

          <div className="w-full relative hidden lg:block">
            <div
              className={cn(
                "relative lg:left-5 w-px h-24 bg-[#D0D5DD] transition-all duration-300",
                activeTab > "2" && "bg-primary"
              )}
            ></div>
          </div>
        </>
      )}

      <div className="relative group p-0 bg-inherit w-full flex-1 min-w-[90px] flex flex-col-reverse lg:flex-row justify-start items-center gap-4 py-0 px-2 lg:p-0">
        <div
          className={cn(
            "flex-grow flex-shrink basis-auto lg:hidden absolute top-12 left-[calc(-50%+20px)] right-[calc(50%+20px)] h-px w-[calc(100%-40px)] bg-[#D0D5DD] transition-all duration-300",
            {
              "bg-primary": activeTab > "2",
            }
          )}
        ></div>
        <div
          className={`h-7 w-7 lg:h-10 lg:w-10 ${
            activeTab === "3" && "border-none"
          } flex rounded-full border border-primary bg-primary-200 flex-shrink-0 justify-center items-center`}
        >
          <Circle
            className={`absolute opacity-0 ${
              activeTab === "3" && "opacity-100"
            } h-3 w-3 lg:h-5 lg:w-5  bg-primary text-primary rounded-full transition-all duration-300`}
          />
        </div>
        <p
          className={cn(
            "text-xs sm:text-base text-[#707070] transition-all duration-300",
            {
              "text-[#000066]": activeTab === "3",
            }
          )}
        >
          Checkout
        </p>
      </div>
    </div>
  );
};

Stepper.propTypes = {
  card: PropTypes.object,
};

DisabledLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
};

export default Stepper;
