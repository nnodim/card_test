import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Skeleton } from "./ui/skeleton";
import { Star } from "lucide-react";

const CardPlaceholder = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-6">
      <div className="min-h-[143px] sm:w-[150px] md:w-full sm:h-[200px] md:h-[333px] overflow-hidden">
        <Skeleton className="w-full h-full object-cover object-center rounded-xl" />
      </div>
      {/* <Skeleton className="w-1/2 h-6" /> */}
    </div>
  );
};

export const CardListing = ({ to, card, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  const getName = (name) => {
    if (!name) {
      return "Unknown";
    }
    const words = name.split("_");
    return words.slice(0, 2).join(" ");
  };

  const name = getName(card?.name);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!card || !isVisible) return <CardPlaceholder />;

  return (
    <Link
      className={cn("invisible h-full w-full group/main relative", {
        "visible animate-in fade-in-5": isVisible,
      })}
      to={`${to}/${card.id}`}
    >
      {card?.customizable && (
        <p className="bg-primary text-xs sm:text-sm md:text-base rounded-sm px-2 py-1 text-white font-medium  flex items-center absolute -top-4 -left-2">
          <Star className="w-2.5 h-2.5 md:w-4 md:h-4 mr-1" />
          Customise
        </p>
      )}
      <div className="w-full flex flex-col items-center justify-center gap-y-6">
        <div className="min-h-[143px] sm:w-[150px] md:w-full sm:h-[200px] md:h-[333px] overflow-hidden">
          <img
            className="w-full h-full object-cover object-center"
            src={card?.url}
            alt={name}
          />
        </div>
        {/* <p>{name}</p> */}
      </div>
    </Link>
  );
};

CardListing.propTypes = {
  card: PropTypes.object,
  index: PropTypes.number,
  to: PropTypes.string,
};
