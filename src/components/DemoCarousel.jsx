import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { DEMODATA, IMAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { useEffect, useState } from "react";

export const DemoCarousel = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-center gap-[50px]">
      <Carousel
        setApi={setApi}
        plugins={[Autoplay({ delay: 3000 }), Fade()]}
        className="w-full"
      >
        <CarouselContent className="w-full mx-auto aspect-square lg:h-[528px]">
          {IMAGES.map((_, index) => (
            <CarouselItem key={index} className="w-full h-full p-0">
              <div className="w-full h-full">
                <Card
                  className={`border-none ${IMAGES[index].bg} p-0 sm:px-8 md:pt-[42px] md:pb-[26px] md:px-[60px] w-full h-full`}
                >
                  <CardContent className="flex h-full w-full items-center justify-center p-0">
                    <img
                      src={IMAGES[index].src}
                      alt=""
                      className="w-[255px] h-[257px] sm:w-full sm:h-full object-cover object-center"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex flex-col gap-4">
        {DEMODATA.map((item, index) => (
          <div
            key={index}
            className={cn(
              "border-l-2 border-[#BDBDBD] text-[#828282] pl-6 pr-2 py-3 transition-all duration-500",
              {
                "border-primary text-primary bg-[#7C4CFF1A] scale-x-[1.05] scale-y-[1.05]":
                  index === current - 1,
              }
            )}
          >
            <div className="flex gap-4">
              <span className="mt-1">{item.icon}</span>
              <div className="flex flex-col gap-4">
                <h4 className="text-[20px] leading-[30px]">{item.title}</h4>
                <p className="text-[#828282] font-light">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
