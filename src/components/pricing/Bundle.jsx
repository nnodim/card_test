import { CheckIcon } from "@/components/icons/CheckIcon";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import PropTypes from "prop-types";
import { getAllBundles } from "@/api/bundle";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const BundleCard = ({
  id,
  title,
  originalPrice,
  originalDollarPrice,
  discountedPrice,
  discountedDollarPrice,
  discount,
  cardsCount,
}) => {
  return (
    <div className="relative flex flex-col bg-white px-7 sm:pl-[54px] sm:pr-16 pb-5 pt-10 rounded-lg shadow-lg border border-gray-200 mb-6 w-full max-w-xl mx-auto">
      {!!discount && (
        <div className="absolute top-3 left-2 transform -rotate-[5deg]">
          <span className="relative bg-[#EDD70D] text-[#333333] px-5 py-2 rounded-full">
            {discount}% off
            <Realistic
              className="w-[200px] absolute -top-9 -left-10 sm:-top-14 sm:-left-16"
              autorun={{ speed: 0.3 }}
              decorateOptions={(opt) => ({
                ...opt,
                spread: 140,
                ticks: 300,
                particleCount: 5,
                startVelocity: 10,
                gravity: 0.4,
                scalar: 0.8,
              })}
            />
          </span>
        </div>
      )}
      <div className="flex border-b flex-col justify-between font-bricolage gap-6 text-[#333333]">
        <div className="flex justify-between">
          <h5 className="text-[#363535] sm:text-2xl leading-7 font-bold">
            {title}
          </h5>
          <span className="sm:text-2xl font-medium text-primary">
            {cardsCount} Cards
          </span>
        </div>
        <div>
          <div className="flex items-end gap-2 line-through">
            <h2 className="text-2xl sm:text-[40px]/[48px] font-bricolage font-bold">
              {`₦${originalPrice}`}
            </h2>
            <p className="font-light sm:text-xl font-bricolage leading-6 sm:mb-2">
              {`($${originalDollarPrice})`}
            </p>
          </div>
          <div className="flex items-end gap-2">
            <h2 className="text-5xl sm:text-6xl/[72px] font-bricolage font-bold">
              {`₦${discountedPrice.toLocaleString()}`}
            </h2>
            <p className="font-light text-xl sm:text-3xl font-bricolage sm:mb-3">
              {`($${discountedDollarPrice})`}
            </p>
          </div>
        </div>
      </div>
      <Link to={`/bundle/${id}/checkout`} className="self-end">
        <Button className="bg-primary mt-5 text-white py-3 px-7 text-xl rounded-full h-auto w-full">
          Buy Bundle
        </Button>
      </Link>
    </div>
  );
};

const Bundle = () => {
  const { data } = useQuery({
    queryKey: ["bundles"],
    queryFn: () => getAllBundles(),
  });

  const filteredData = data?.filter(
    (item) => item.name !== "Group" && item.name !== "Single"
  );
  return (
    <section className="flex flex-col lg:flex-row justify-between items-center text-white bg-primary lg:pr-[60px] lg:pl-20 lg:py-8 px-5 py-10 xl:rounded-xl gap-[60px] w-full max-w-7xl">
      <div className="w-full max-w-xl">
        <h2 className="text-2xl sm:text-6xl/[72px] font-bricolage font-bold  mb-3">
          Bundle card purchase
        </h2>
        <p className="sm:text-xl text-[#EDE6FF] leading-6  mb-6">
          The Bundle packages enables you to buy cards in large quantities at a
          discounted rate.
        </p>
        <p className="sm:text-xl text-[#EDE6FF] leading-6  mb-5">
          You can utilize this bundle at any time.
        </p>
        <hr className="border-t border-gray-300 w-full mb-8" />
        <h3 className="sm:text-xl font-medium mb-6">Features:</h3>
        <ul className="space-y-6">
          <li className="flex items-center gap-2">
            <CheckIcon />
            Variety of Cards Designs
          </li>
          <li className="flex gap-2 items-center">
            <CheckIcon />
            No Expiry Date
          </li>
          <li className="flex gap-2 items-center">
            <CheckIcon />
            Unlimited pages
          </li>
          <li className="flex gap-2 items-center">
            <CheckIcon />
            Use all cards categories
          </li>
          <li className="flex gap-2 items-center">
            <CheckIcon />
            Custom Text or Picture
          </li>
          <li className="flex gap-2 items-center">
            <CheckIcon />
            Theme Customization
          </li>
          <li className="flex gap-2 items-center">
            <CheckIcon />
            Delivery Date and Time
          </li>
          <li className="flex gap-2 items-center">
            <CheckIcon />
            Delivery Notification
          </li>
          <li className="flex gap-2 items-center">
            <CheckIcon />
            Thank-you Message & PDF Download
          </li>
          <li className="flex gap-2 items-center">
            <CheckIcon />
            Effortless invitation with share link
          </li>
          <li className="flex gap-2 items-center">
            <CheckIcon />
            Real-time tracking
          </li>
        </ul>
      </div>
      <div className="flex flex-col w-full">
        {filteredData?.map((item) => (
          <BundleCard
            key={item.id}
            id={item.id}
            title={item.name}
            discountedPrice={item.price}
            discountedDollarPrice={item.dollarPrice}
            cardsCount={item.numberOfCards}
            originalPrice={
              item.numberOfCards === 5
                ? "9,995"
                : item.numberOfCards === 10
                ? "19,990"
                : "49,975"
            }
            originalDollarPrice={
              item.numberOfCards === 5
                ? 19.95
                : item.numberOfCards === 10
                ? 39.9
                : 99.75
            }
            discount={
              item.numberOfCards === 5
                ? "10"
                : item.numberOfCards === 10
                ? "15"
                : "25"
            }
          />
        ))}
      </div>
    </section>
  );
};

export default Bundle;

BundleCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  originalPrice: PropTypes.string,
  discountedPrice: PropTypes.number,
  discount: PropTypes.string,
  originalDollarPrice: PropTypes.number,
  discountedDollarPrice: PropTypes.number,
  cardsCount: PropTypes.number,
};
