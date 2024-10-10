import PropTypes from "prop-types";
import { CardListing } from "./CardListing";
import { getAllCard } from "@/api/cards";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { social } from "@/assets";

const FALLBACK_LIMIT = 5;

export const CardReel = ({ page, setPage, paginate, to, query }) => {
  const [totalPages, setTotalPages] = useState(1);

  const {
    data: cards,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cards", ...Object.values(query)],
    queryFn: () => getAllCard({ ...query }),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (cards) {
      setTotalPages(cards.totalPages);
    }
  }, [cards]);

  let map = [];
  if (cards && cards.results.length) {
    map = cards.results;
  } else if (isLoading) {
    map = new Array(query.limit ?? FALLBACK_LIMIT).fill(null);
  }

  return (
    <section className="py-4 sm:py-12 w-full">
      {isError ? (
        <div className="flex flex-col justify-center items-center w-full">
          <img src={social} alt="" />
          <span className="text-2xl font-bold font-bricolage">Oops Something went wrong!</span>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center w-full">
            <div className="w-full grid grid-cols-3 lg:grid-cols-5 gap-y-5 gap-x-2 md:gap-x-5 md:gap-y-10 ">
              {map.map((card, index) => {
                return (
                  <div
                    className="border flex cursor-pointer border-[#4F4F4F]"
                    key={card?.id ?? index}
                  >
                    <CardListing to={to} card={card} index={index} />
                  </div>
                );
              })}
            </div>
          </div>
          {paginate && (
            <div className="flex justify-between items-center w-full mt-8">
              <Button
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span>
                {page} of {totalPages}
              </span>
              <Button
                onClick={() =>
                  setPage((old) =>
                    !cards || cards.totalPages === old ? old : old + 1
                  )
                }
                disabled={page === cards?.totalPages}
              >
                Next
              </Button>
            </div>
          )}{" "}
        </>
      )}
    </section>
  );
};

CardReel.propTypes = {
  to: PropTypes.string,
  query: PropTypes.object,
  paginate: PropTypes.bool,
  page: PropTypes.number,
  setPage: PropTypes.func,
};
