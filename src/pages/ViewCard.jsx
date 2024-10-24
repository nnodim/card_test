import { getSignatures, sendThankYouMessage, viewCard } from "@/api/cards";
import { cardBg } from "@/assets";
import { CarouselPagination } from "@/components/cardSigning/CarouselPagination";
import { PDFDownloadButton } from "@/components/PDFDownloadButton";
import { PurchaseCadrdImg } from "@/components/PurchaseCadrdImg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useToast } from "@/components/ui/use-toast";
import useAxiosPrivate from "@/hooks/useAxioPrivate";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { CircleAlert, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import { useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router-dom";
import NotFound from "./NotFound";

const existingToken = localStorage.getItem("userToken");

export const ViewCard = () => {
  const { cardId } = useParams();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const cardToken = searchParams.get("cardToken");
  const axiosPrivate = useAxiosPrivate();
  const [emblaApi, setEmblaApi] = useState(null);
  const [maxPage, setMaxPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const { register, handleSubmit, reset } = useForm();

  const parentRef = useRef(null);

  const {
    data: cardData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["viewCard", cardToken],
    queryFn: () => viewCard(cardToken, axiosPrivate),
    enabled: !!cardToken,
  });

  const { data: messages } = useQuery({
    queryKey: ["cardMessages", cardId],
    queryFn: () => getSignatures(cardId, existingToken),
    enabled: !!cardId,
  });

  const carouselRef = useRef(null);
  const instance = useRef(null);
  const onInit = ({ confetti }) => {
    instance.current = confetti;
  };
  useEffect(() => {
    const updateDimensions = () => {
      if (parentRef.current) {
        const parent = parentRef.current.getBoundingClientRect();
        setWidth(parent.width);
        setHeight(parent.height);
      }
    };
    const debouncedUpdateDimensions = debounce(updateDimensions, 50);
    debouncedUpdateDimensions();

    const resizeObserver = new ResizeObserver(debouncedUpdateDimensions);
    if (parentRef.current) {
      resizeObserver.observe(parentRef.current);
    }

    window.addEventListener("resize", debouncedUpdateDimensions);

    return () => {
      window.removeEventListener("resize", debouncedUpdateDimensions);
      resizeObserver.disconnect();
      debouncedUpdateDimensions.cancel();
    };
  }, [parentRef.current]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      const highestPage = Math.max(...messages.map((msg) => msg.page));
      setMaxPage(Math.max(highestPage + 1, maxPage));
    }
  }, [messages, maxPage]);

  const { mutate: send, isPending } = useMutation({
    mutationKey: ["send"],
    mutationFn: sendThankYouMessage,
    onSuccess: () => {
      reset();
      toast({
        title: "Success",
        description: "Thank you message sent",
        variant: "success",
        className: "bg-white",
      });
      setIsOpen(false);
    },
    onError: (error) => {
      const errorMessage = error.response
        ? error.response.data.message
        : "No server response";
      toast({
        className: "border-0 border-l-4 border-red-500 bg-white",
        title: (
          <span className="flex items-center gap-2 text-red-500">
            <CircleAlert className="w-4 h-4" />
            Error
          </span>
        ),
        description: errorMessage,
      });
    },
  });

  const calculateResponsiveStyles = (message) => {
    const baseWidth = 480;
    const baseHeight = 678;

    const scaleFactor = Math.min(width / baseWidth, height / baseHeight);
    return {
      position: "absolute",
      left: `${(message.x / baseWidth) * 100}%`,
      top: `${(message.y / baseHeight) * 100}%`,
      width: `${(message.width / baseWidth) * 100}%`,
      height: `${(message.height / baseHeight) * 100}%`,
      fontSize: `${(parseFloat(message.fontSize) * scaleFactor).toFixed()}px`,
      textAlign: message.textAlign,
      fontFamily: message.fontFamily,
      color: message.fontColor,
      backgroundColor: message.bgColor,
    };
  };

  const onSubmit = (data) => {
    send({
      message: data.message,
      purchaseId: cardId,
      cardToken: cardToken,
    });
  };

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-300px)] w-full flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !cardData) return <NotFound text="Card not found" />;
  return (
    <main className="py-32 px-4 md:px-10 bg-[#F7F4FF]">
      <div className="w-full max-w-5xl relative mx-auto flex flex-col md:flex-row justify-between gap-16">
        {cardData?.card?.addConfetti && (
          <Realistic
            className="w-full absolute md:-left-[20%] md:-top-[20%] z-50"
            onInit={onInit}
            autorun={{ speed: 0.3, duration: 200 }}
            decorateOptions={(opt) => ({
              ...opt,
            })}
          />
        )}
        <div className="w-full max-w-[480px] mx-auto relative flex flex-col gap-5">
          <Carousel
            opts={{ loop: false }}
            setApi={setEmblaApi}
            className="w-full relative"
          >
            <CarouselContent className="w-full" ref={carouselRef}>
              {Array.from({ length: maxPage }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="embla__slide w-full p-0 max-h-[678px] z-10 relative"
                  ref={parentRef}
                >
                  <div className="embla__slide__number h-full p-0">
                    <Card className="rounded-none w-full h-full border-none bg-cover bg-repeat bg-center overflow-hidden">
                      <CardContent className="flex items-center justify-center p-0 h-full">
                        {index === 0 ? (
                          <PurchaseCadrdImg card={cardData?.card} />
                        ) : (
                          <div className="relative w-full h-full">
                            <img
                              className="w-full h-full object-cover object-center"
                              src={cardBg}
                              alt=""
                            />
                            {messages &&
                              messages
                                .filter(({ page }) => page === index)
                                .map(
                                  (
                                    {
                                      content,
                                      x,
                                      y,
                                      width,
                                      height,
                                      fontFamily,
                                      bgColor,
                                      fontColor,
                                      textAlign,
                                      fontSize,
                                      type,
                                    },
                                    index
                                  ) => {
                                    const cleanHTML = DOMPurify.sanitize(
                                      content,
                                      {
                                        FORBID_ATTR: ["style"],
                                      }
                                    );
                                    return (
                                      <div
                                        key={index}
                                        style={calculateResponsiveStyles({
                                          x,
                                          y,
                                          width,
                                          height,
                                          fontFamily,
                                          bgColor,
                                          fontColor,
                                          textAlign,
                                          fontSize,
                                        })}
                                        className={cn(
                                          `*:break-words flex gap-4 flex-col py-3 select-none`
                                        )}
                                      >
                                        {type === "text" ? (
                                          <>{parse(cleanHTML)}</>
                                        ) : (
                                          <img
                                            className="w-full h-full object-contain object-center"
                                            src={content}
                                            alt=""
                                          />
                                        )}
                                      </div>
                                    );
                                  }
                                )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-primary border-0 hidden md:flex z-[999]" />
            <CarouselNext className="text-primary border-0 hidden md:flex z-[999]" />
          </Carousel>

          <CarouselPagination emblaApi={emblaApi} />
        </div>
        <div className="px-10 py-5 flex flex-col items-center gap-5">
          <PDFDownloadButton
            contentRef={carouselRef}
            filename="cards.pdf"
            messages={messages}
            cardData={cardData}
            options={{
              width,
              height,
              scale: 2,
            }}
          />

          <div>
            <Button
              variant="link"
              className={`text-primary px-0 py-5 rounded-full text-xl/6 h-auto font-normal capitalize underline-offset-[5px] transition-all ${
                isOpen ? "underline" : ""
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              Send appreciation message
            </Button>

            <form
              className={`${
                isOpen ? "" : "hidden"
              } flex flex-col gap-3 items-center`}
              onSubmit={handleSubmit(onSubmit)}
            >
              <textarea
                name="message"
                className={cn(
                  "flex bg-[#7C4CFF12] rounded-lg h-auto py-4 pl-5 w-full border border-input px-5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                )}
                rows="5"
                {...register("message")}
                placeholder="Enter message"
                id=""
              ></textarea>

              <Button
                className={`text-white px-6 rounded-full py-3 text-xl/6 h-auto font-normal capitalize underline-offset-[5px] transition-all`}
                type="submit"
                disabled={isPending}
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
