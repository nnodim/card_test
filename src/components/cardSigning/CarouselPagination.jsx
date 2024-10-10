import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDotButton } from "@/hooks/useDotButton";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

export const CarouselPagination = ({ emblaApi }) => {
  const { selectedIndex, scrollSnaps, onDotButtonClick, onNext, onPrevious } =
    useDotButton(emblaApi);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            disabled={selectedIndex === 0}
            onClick={onPrevious}
            className="bg-white text-black p-[10px] border border-primary-200 shadow-[0px_0px_1px_0px_#7C4CFF] hover:bg-primary hover:text-white text-xs"
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>
        {scrollSnaps.map((_, index) => (
          <PaginationItem key={index}>
            <Button
              onClick={() => onDotButtonClick(index)}
              className={cn(
                "bg-white text-black p-[10px] border border-primary-200 shadow-[0px_0px_1px_0px_#7C4CFF] hover:bg-primary hover:text-white text-xs",
                selectedIndex === index && "bg-primary text-white"
              )}
            >
              {index}
            </Button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            onClick={onNext}
            disabled={scrollSnaps.length - 1 === selectedIndex}
            className="bg-white text-black p-[10px] border border-primary-200 shadow-[0px_0px_1px_0px_#7C4CFF] hover:bg-primary hover:text-white text-xs"
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

CarouselPagination.propTypes = {
  emblaApi: PropTypes.any,
};
