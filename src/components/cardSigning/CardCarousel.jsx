import { cardBg } from "@/assets";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useCardSigning from "@/hooks/useCardSigningStore";
import { cn } from "@/lib/utils";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import DraggableImageEditor from "../DraggableImageEditor";
import { PurchaseCadrdImg } from "../PurchaseCadrdImg";
import TextEditor from "../textEditor/TextEditor";
import { debounce } from "lodash";
import { PDFDownloadButton } from "../PDFDownloadButton";
import useAuthStore from "@/hooks/useAuthStore";

const existingToken = localStorage.getItem("userToken");

export function CardCarousel({
  card,
  setEmblaApi,
  handleSubmit,
  onSubmit,
  editor,
  isSigning,
  isUpdating,
  handleEdit,
  messages,
  checkOverlap,
  handleContentSubmission,
}) {
  const { user } = useAuthStore();
  const [maxWidth, setMaxWidth] = useState(Infinity);
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const carouselRef = useRef(null);
  const parentRef = useRef(null);
  const {
    editingMessage,
    setEditingMessage,
    newImage,
    setNewImage,
    current,
    maxPage: pageCount,
    imageEditorOpen,
    setImageEditorOpen,
  } = useCardSigning();

  const handleSave = () => {
    const { id, content, x, y, width, height, rotation } = editingMessage;
    const currentPage = current - 1;
    const isLastPage = currentPage === pageCount;

    if (currentPage === 0) {
      alert("Cannot add message on first page");
      return;
    }

    if (!width || !height) {
      alert("Please adjust the image size before saving");
      return;
    }

    if (checkOverlap(id, { x, y }, { width, height }, current - 1, messages)) {
      alert(`Overlapping signatures!
Drag and drop your signature to a free spot or Change pages by using the arrows below the card.`);
      return;
    }

    const payload = {
      content: content,
      x: x,
      y: y,
      width: width,
      height: height,
      rotation: rotation,
      name: " ",
      message: " ",
      fontFamily: "sans-serif",
      fontSize: "16px",
      fontColor: "#000000",
      bgColor: "transparent",
      textAlign: "left",
      type: "image",
      page: current - 1,
    };
    handleContentSubmission(payload, newImage, isLastPage);
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (parentRef.current) {
        const parent = parentRef.current.getBoundingClientRect();
        setMaxWidth(parent.width - editingMessage?.x);
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
  }, [editingMessage, parentRef, editor]);

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
    };
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {card?.sent && card?.user === user?.id && (
        <PDFDownloadButton
          contentRef={carouselRef}
          filename="cards.pdf"
          cardData={card}
          options={{
            width: "480px",
            height: "678px",
            scale: 2,
          }}
        />
      )}
      <div className="w-full relative max-w-[480px]">
        <Carousel
          opts={{ loop: false }}
          setApi={setEmblaApi}
          className="w-full relative"
        >
          <CarouselContent className="w-full" ref={carouselRef}>
            {Array.from({ length: pageCount }).map((_, index) => (
              <CarouselItem
                key={index}
                className="embla__slide w-full max-h-[678px] z-10 relative"
                ref={parentRef}
              >
                <div className="p-1 embla__slide__number h-full">
                  <Card className="w-full h-full border-none bg-cover bg-repeat bg-center rounded-none overflow-hidden">
                    <CardContent className="flex items-center justify-center p-0 h-full">
                      {index === 0 ? (
                        <PurchaseCadrdImg card={card} />
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
                                    id,
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
                                    userToken,
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
                                      onClick={() =>
                                        handleEdit(
                                          id,
                                          { x, y },
                                          { width, height }
                                        )
                                      }
                                      className={cn(
                                        `*:break-words border border-transparent flex gap-4 flex-col py-3 select-none`,
                                        {
                                          hidden:
                                            editingMessage &&
                                            editingMessage?.id === id,
                                          "cursor-pointer":
                                            !card?.sent ||
                                            userToken !== existingToken,
                                        }
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
          <CarouselPrevious className="text-primary border-0 hidden md:flex" />
          <CarouselNext className="text-primary border-0 hidden md:flex" />
        </Carousel>

        <TextEditor
          editor={editor}
          maxWidth={maxWidth}
          width={width}
          height={height}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isSigning={isSigning}
          isUpdating={isUpdating}
        />

        <DraggableImageEditor
          imageEditorOpen={imageEditorOpen}
          editingMessage={editingMessage}
          setEditingMessage={setEditingMessage}
          maxWidth={maxWidth}
          width={width}
          height={height}
          onCancel={() => {
            setEditingMessage(null);
            setNewImage(false);
            setImageEditorOpen(false);
          }}
          onSave={handleSave}
          isDisabled={isSigning || isUpdating}
          showDelete={false}
        />
      </div>
    </div>
  );
}

CardCarousel.propTypes = {
  card: PropTypes.object,
  setEmblaApi: PropTypes.func,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  editor: PropTypes.object,
  isSigning: PropTypes.bool,
  isUpdating: PropTypes.bool,
  handleEdit: PropTypes.func,
  checkOverlap: PropTypes.func,
  messages: PropTypes.array,
  handleContentSubmission: PropTypes.func,
};
