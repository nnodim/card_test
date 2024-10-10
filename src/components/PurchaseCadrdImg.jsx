import { cn } from "@/lib/utils";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
export const PurchaseCadrdImg = ({ card }) => {
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });
  const parentRef = useRef(null);
  useEffect(() => {
    if (parentRef.current) {
      const { width, height } = parentRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);
  return (
    <div ref={parentRef} className="w-full h-full">
      <img
        className="w-full h-full object-cover object-center"
        src={card?.card?.url}
        alt={card?.card?.name}
      />
      {card && (
        <div
          style={{
            left: `${(card.meta?.message?.x / 480) * 100}%`,
            top: `${(card.meta?.message?.y / 678) * 100}%`,
            position: "absolute",
            width: `${(card.meta?.message?.width / 480) * 100}%`,
            height: `${(card.meta?.message?.height / 678) * 100}%`,
            textAlign: card.meta?.message?.textAlign,
            fontFamily: card.meta?.message?.fontFamily,
            fontSize: `${(
              (parseFloat(card.meta?.message?.fontSize) / 480) *
              dimensions.width
            ).toFixed()}px`,
            color: card.meta?.message?.color,
          }}
        >
          <p
            className={cn("", {
              "line-through": card.meta?.message?.strikeThrough,
              "font-bold": card.meta?.message?.bold,
              italic: card.meta?.message?.italic,
            })}
          >
            {card.meta?.message?.name}
          </p>
        </div>
      )}
      {card &&
        card?.meta?.images?.map((image, index) => {
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `${(image.x / 480) * 100}%`,
                top: `${(image.y / 670) * 100}%`,
                width: `${(image.width / 480) * 100}%`,
                height: `${(image.height / 670) * 100}%`,
              }}
            >
              <img src={image.content} alt="" />
            </div>
          );
        })}
    </div>
  );
};

PurchaseCadrdImg.propTypes = {
  card: PropTypes.object.isRequired,
};
