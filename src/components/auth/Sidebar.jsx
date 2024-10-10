import { iconWhite } from "@/assets";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { HOME } from "@/lib/routes";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import * as React from "react";
import { Link } from "react-router-dom";

const carouselItems = [
  {
    bgImage:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1720381866764/b7057fef-b605-48cd-899c-f69e8fb650be.png",
    title: "Browse Our E-Card Selection for Every Occasion",
    subtitle: "Personalize with style: Everyone deserves beautiful memories.",
    header: "Personalized",
    description:
      "We offers degree of customization, allowing senders to personalize their greetings with custom messages, and images.",
  },
  {
    bgImage:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1720381866764/b7057fef-b605-48cd-899c-f69e8fb650be.png",
    title: "Browse Our E-Card Selection for Every Occasion",
    subtitle: "Personalize with style: Everyone deserves beautiful memories.",
    header: "Co-signing",
    description:
      "This allows multiple individuals to add their messages using a shareable link, making it a collaborative way to celebrate loved ones.",
  },
  {
    bgImage:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1720383273316/1df60448-502f-44e0-bf1d-fe96f6815bdd.png",
    title: "Browse Our E-Card Selection for Every Occasion",
    subtitle: "Personalize with style: Everyone deserves beautiful memories.",
    header: "Prompt and Convenient",
    description:
      "Create, Customize, and send e-card online in 60 secs, eliminating the need to visit a store to purchase physical cards or to send them via post.",
  },
  {
    bgImage:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1720379264699/cd641a3b-a3ab-403c-981c-be77ecc80726.png",
    title: "Browse Our E-Card Selection for Every Occasion",
    subtitle: "Personalize with style: Everyone deserves beautiful memories.",
    header: "Unlimited pages",
    description:
      " Gives users ability to utilize as many pages as needed for multiple signatories.",
  },
];

export const Sidebar = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <section className="hidden lg:flex flex-col overflow-auto text-white my-4 mx-6 rounded-xl font-inter max-w-lg w-full relative">
      <Link to={HOME} className="z-10">
        <img src={iconWhite} alt="" className="absolute top-10 left-14" />
      </Link>
      <Carousel
        className="w-full h-full"
        plugins={[plugin.current, Fade()]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full">
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} className="h-full">
              <div
                className="absolute inset-0 bg-cover bg-center z-0 h-full"
                style={{ backgroundImage: `url(${item.bgImage})` }}
              />
              <div className="relative z-10 h-full flex flex-col justify-center p-8 bg-black bg-opacity-50">
                <Card className="bg-transparent shadow-none border-none">
                  <CardContent className="flex flex-col items-start p-6 mt-16">
                    <div>
                      <h1 className="max-w-md text-4xl mb-2 font-extrabold font-bricolage text-white">
                        {item.title}
                      </h1>
                      <p className="max-w-[400px] font-light text-white">
                        {item.subtitle}
                      </p>
                    </div>
                    <div className="mt-20 flex flex-col gap-y-4 pl-5 pr-14 py-6 bg-[#ffffff1a] rounded-xl">
                      <h2 className="max-w-md text-2xl font-semibold text-white">
                        {item.header}
                      </h2>
                      <p className="max-w-[400px] font-inter font-light text-primary-200">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
